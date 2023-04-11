import { Scene } from "@babylonjs/core";
import { BaseScene } from "../lib";

export class BasicScene extends BaseScene {
  createScene = (engine = this.engine) => {
    const scene = new Scene(engine);

    return scene;
  };
}
