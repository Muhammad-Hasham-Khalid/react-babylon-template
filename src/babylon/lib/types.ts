import { ILoadingScreen } from "@babylonjs/core/Loading/loadingScreen";

export type CustomSceneOptions = {
  debug: boolean;
  customLoadingScreen?: ILoadingScreen;
};

export type MayBePromise<T> = T | Promise<T>;
