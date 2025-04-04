import { Container } from "pixi.js";
import { Logging } from "../../lib/logging";
import { ObjOverlay, objOverlay } from "../objects/overlay/obj-overlay";

export class IguaLayers {
    readonly scene: Container;
    readonly overlay: ObjOverlay;

    constructor(private readonly _root: Container) {
        this.scene = new Container().named("SceneStack");
        this.overlay = objOverlay();

        _root.addChild(this.scene, this.overlay);

        console.log(...Logging.componentArgs(this));
    }
}
