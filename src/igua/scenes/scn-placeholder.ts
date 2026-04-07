import { Graphics } from "pixi.js";
import { objText } from "../../assets/fonts";
import { Lvl } from "../../assets/generated/levels/generated-level-data";
import { interp, interpv } from "../../lib/game-engine/routines/interp";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { Rng } from "../../lib/math/rng";
import { ForceTintFilter } from "../../lib/pixi/filters/force-tint-filter";
import { Key, scene } from "../globals";
import { mxnActionRepeater } from "../mixins/mxn-action-repeater";
import { objCharacterLushious } from "../objects/obj-character-lushious";

export function scnPlaceholder() {
    objCharacterLushious()
        .at(100, 100)
        .step(self => self.objCharacterLushious.pedometer += 1)
        .coro(function* (self) {
            while (true) {
                yield sleep(1000);
                yield interpv(self.objCharacterLushious.headObj.objCharacterLushiousHead.facing)
                    .to(Rng.vunit())
                    .over(300);
            }
        })
        .show();
}
