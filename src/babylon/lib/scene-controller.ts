import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import type { CustomSceneOptions, MayBePromise } from "./types";
import { Camera } from "@babylonjs/core/Cameras/camera";
import { resolveValue } from "./utils";

const defaultOptions: CustomSceneOptions = {
  debug: false,
};

export abstract class SceneController {
  protected engine: Engine;
  protected scene?: Scene;
  protected options: CustomSceneOptions;

  constructor(canvas: HTMLCanvasElement, options = defaultOptions) {
    this.engine = new Engine(canvas, true);
    this.options = options;

    if (options.customLoadingScreen) {
      this.engine.loadingScreen = options.customLoadingScreen;
    }
  }

  private resize = () => this.scene?.getEngine().resize();

  public dispose() {
    this.scene?.getEngine().dispose();
    window.removeEventListener("resize", this.resize);
  }

  public async initialize() {
    this.engine.displayLoadingUI();
    // ===================================

    this.scene = await resolveValue(this.createScene(this.engine));

    await resolveValue(this.createEnvironment(this.scene));

    // show devtools
    if (this.options.debug) {
      this.scene.debugLayer.show({ enableClose: true, overlay: true });
    } else {
      this.scene.debugLayer.hide();
    }

    window.addEventListener("resize", this.resize);

    // ===================================
    this.engine.hideLoadingUI();
    this.engine.runRenderLoop(this.render);
  }

  /**
   * @param engine
   * @description Create the scene with or without the additional items in this function
   */
  abstract createScene: (engine: Engine) => MayBePromise<Scene>;

  /**
   * @description Create the environment for the scene in this method.
   * It is called just after the scene is created.
   */
  createEnvironment: (scene: Scene) => MayBePromise<void> = () => {};

  abstract createCamera: (scene: Scene) => Camera;

  /**
   * @description This method contains the rendering logic for the scene and can be overriden if needed
   */
  render = () => {
    if (!this.scene) {
      throw new Error("initialize() should be called before calling render()");
    }

    this.scene.render();
  };
}
