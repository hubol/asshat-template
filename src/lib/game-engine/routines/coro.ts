import { Logger } from "../logger";

export namespace Coro {
    export type Predicate = () => boolean;
    export type Type<T = unknown> = Generator<Predicate, T, unknown>;

    const unsetReturnResult: unique symbol = Symbol("Coro.unsetReturnResult");
    type UnsetReturnResult = typeof unsetReturnResult;

    interface RunnerState<T> {
        predicate: Predicate | null;
        done: boolean;
        returnResult: T | UnsetReturnResult;
    }

    export function createRunnerState<T>(): RunnerState<T> {
        return {
            predicate: null,
            done: false,
            returnResult: unsetReturnResult,
        };
    }

    export const runner = <T = unknown>(generator: Type<T>, state: RunnerState<T>) => {
        if (state.done) {
            return true;
        }

        for (let i = 0; i < 256; i++) {
            if (state.predicate === null) {
                const next = generator.next();
                if (next.done) {
                    state.returnResult = next.value;
                    state.done = true;
                    return true;
                }

                state.predicate = next.value;
            }

            if (state.predicate()) {
                state.predicate = null;
            }
            else {
                return false;
            }
        }

        Logger.logContractViolationError(
            "Coro.runner",
            new Error(`Possible infinite coro loop detected!`),
            generator,
            state.predicate,
        );
        return false;
    };

    type ReturnedByGenerator<T> = T extends Coro.Type<infer U> ? U : never;

    /**
     * Something of an analog to Promise.race, with dramatically different implementations.
     * When *any* one of the supplied predicates returns true or Coros completes, then this Coro completes.
     * @param values
     */
    export function* race(values: ReadonlyArray<Coro.Type | Predicate>): Coro.Type<void> {
        const length = values.length;
        const predicates: Predicate[] = [];

        for (let i = 0; i < length; i++) {
            const value = values[i];
            if (isCoroType(value)) {
                predicates.push(runner.bind(null, value, createRunnerState()));
            }
            else {
                predicates.push(value);
            }
        }

        yield () => {
            for (let i = 0; i < length; i++) {
                if (predicates[i]()) {
                    return true;
                }
            }

            return false;
        };
    }

    export function* all<T extends ReadonlyArray<Coro.Type | Predicate> | []>(
        values: T,
    ): Coro.Type<{ -readonly [P in keyof T]: ReturnedByGenerator<T[P]> }> {
        const completedIndices: boolean[] = [];
        const results: any[] = [];
        const predicates: Predicate[] = [];
        const runnerStates: RunnerState<unknown>[] = [];

        const length = values.length;
        let toCompleteCount = length;

        for (let i = 0; i < length; i++) {
            const value = values[i];
            if (isCoroType(value)) {
                const runnerState = createRunnerState();
                runnerStates[i] = runnerState;
                predicates.push(runner.bind(null, value, runnerState));
            }
            else {
                predicates.push(value);
            }
        }

        yield () => {
            for (let i = 0; i < length; i++) {
                if (completedIndices[i]) {
                    continue;
                }
                if (predicates[i]()) {
                    results[i] = runnerStates[i]?.returnResult;
                    completedIndices[i] = true;
                    toCompleteCount--;
                }
            }
            return toCompleteCount <= 0;
        };

        return results as any;
    }

    export function* chain(coros: ReadonlyArray<Coro.Type | Predicate>): Coro.Type<void> {
        for (const coro of coros) {
            if (isCoroType(coro)) {
                yield* coro;
            }
            else {
                yield coro;
            }
        }
    }

    /** Re-throws any exceptions thrown by the given predicate at the yield site of this Generator.
     *
     * Usefulness is questionable.
     */
    export function* throws(predicate: Predicate): Type<void> {
        let reason: Error | null = null;
        yield () => {
            try {
                return predicate();
            }
            catch (e) {
                reason = e as Error;
                return true;
            }
        };
        if (reason) {
            throw reason;
        }
    }

    type Executor = (resolve: () => void) => unknown;

    /** Creates a Coro.Predicate from a "Promise-style" executor
     * Note: Has an interesting quirk where the executor will not be called
     * until the next iteration of the Coro runner.
     * This seemed desirable.
     */
    export function resolve(executor: Executor): Predicate {
        let resolved = false;
        let executed = false;
        return () => {
            if (!executed) {
                executor(() => resolved = true);
                executed = true;
            }
            return resolved;
        };
    }

    function isCoroType(value: Coro.Type | Predicate): value is Coro.Type {
        // @ts-expect-error Don't care
        return value["next"];
    }
}
