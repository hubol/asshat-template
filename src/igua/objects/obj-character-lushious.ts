import { Sprite } from "pixi.js";
import { Tx } from "../../assets/textures";
import { RgbInt } from "../../lib/math/number-alias-types";
import { PseudoRng, Rng } from "../../lib/math/rng";
import { vnew } from "../../lib/math/vector-type";
import { container } from "../../lib/pixi/container";

const [
    txWigBack,
    txLimbsRight,
    txShoeBack0,
    txLimbsLeft,
    txShoeFront0,
    txTorso,
    txDress0,
    txDressRoses,
    txTop0,
    txSkirt0,
    txEarLeft,
    txWig0,
    txWig1,
    txEarRight,
    txScleras0,
    txPupils,
    txMouth,
    txMouthAgape,
] = Tx.Lushious.Chibi.Body.split({ width: 134 });

export function objCharacterLushious() {
    const rng = new PseudoRng();
    const wigTint = rng.color();
    const shoeTint = rng.color();

    const headObj = objCharacterLushiousHead(wigTint, rng);

    const api = {
        pedometer: 0,
        headObj,
    };

    return container(
        Sprite.from(txWigBack).tinted(wigTint),
        container(
            Sprite.from(txShoeBack0)
                .tinted(shoeTint),
            Sprite.from(txLimbsLeft),
            Sprite.from(txShoeFront0)
                .tinted(shoeTint),
        )
            .step(self => self.y = -Math.round(Math.sin(api.pedometer / 10) + 1) * Math.sign(api.pedometer) * 2),
        container(
            Sprite.from(txShoeBack0)
                .pivoted(135, 0)
                .scaled(-1, 1)
                .tinted(shoeTint),
            Sprite.from(txLimbsRight),
            Sprite.from(txShoeFront0)
                .pivoted(135, 0)
                .scaled(-1, 1)
                .tinted(shoeTint),
        )
            .step(self => self.y = -Math.round(Math.cos(api.pedometer / 10) + 1) * Math.sign(api.pedometer) * 2),
        Sprite.from(txTorso),
        objCharacterLushiousOutfit(rng),
        headObj,
    )
        .merge({ objCharacterLushious: api });
}

function objCharacterLushiousOutfit(rng: PseudoRng) {
    if (rng.bool()) {
        return container(
            Sprite.from(txDress0).tinted(rng.color()),
            ...rng.bool() ? [] : [Sprite.from(txDressRoses)],
        );
    }

    return container(
        Sprite.from(txSkirt0).tinted(rng.color()),
        Sprite.from(txTop0),
    );
}

function objCharacterLushiousHead(wigTint: RgbInt, rng: PseudoRng) {
    const api = {
        facing: vnew(),
        agape: false,
    };

    return container(
        container(
            Sprite.from(rng.choose(txWig0, txWig1))
                .tinted(wigTint),
            Sprite.from(txEarLeft)
                .step(self => {
                    if (api.facing.x < 0) {
                        self.zIndex = -1;
                    }
                    else if (api.facing.x > 0) {
                        self.zIndex = 1;
                    }
                }),
            Sprite.from(txEarRight)
                .step(self => {
                    if (api.facing.x < 0) {
                        self.zIndex = 1;
                    }
                    else if (api.facing.x > 0) {
                        self.zIndex = -1;
                    }
                }),
        )
            .autoSorted(),
        Sprite.from(txScleras0),
        Sprite.from(txPupils).step(self => self.at(api.facing, 3).vround()),
        Sprite.from(txMouth).step(self => self.texture = api.agape ? txMouthAgape : txMouth),
    )
        .merge({ objCharacterLushiousHead: api });
}
