import { objText } from "../../assets/fonts";
import { Lvl } from "../../assets/generated/levels/generated-level-data";
import { Key } from "../globals";

export function scnPlaceholder() {
    const lvl = Lvl.Placeholder();
    lvl.Block.step(self => {
        if (Key.isDown("ArrowUp")) {
            self.y -= 3;
        }
    });

    objText.Large("Yoooooooo!").show();
}
