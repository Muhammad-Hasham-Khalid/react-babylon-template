import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import { Engine } from "@babylonjs/core/Engines/engine";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Scene } from "@babylonjs/core/scene";
import { SceneController } from "../lib";

export class BasicSceneController extends SceneController {
  camera?: FreeCamera;

  createScene = (engine: Engine) => {
    const scene = new Scene(engine);
    this.camera = this.createCamera(scene);
    return scene;
  };

  createCamera = (scene: Scene) => {
    const cameraPosition = new Vector3(0, 0, 0);
    const camera = new FreeCamera("camera", cameraPosition, scene);
    camera.attachControl();

    return camera;
  };
}
