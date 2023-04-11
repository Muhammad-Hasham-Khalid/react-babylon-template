import { ILoadingScreen } from "@babylonjs/core/Loading/loadingScreen";

type LoaderApi = {
  show: () => void | Promise<void>;
  hide: () => void | Promise<void>;
};

type Options = {
  backgroundColor?: string;
  text?: string;
  loaderApi: LoaderApi;
};

const defaultOptions = {
  backgroundColor: "#f0f0f0",
  text: "LOADING",
  loaderApi: {
    show: () => {},
    hide: () => {},
  },
} satisfies Options;

export class LoadingScreen implements ILoadingScreen {
  loadingUIBackgroundColor: string;
  loadingUIText: string;
  loader: LoaderApi;

  constructor(options: Options) {
    this.loadingUIBackgroundColor =
      options.backgroundColor || defaultOptions.backgroundColor;
    this.loadingUIText = options.text || defaultOptions.text;
    this.loader = options.loaderApi || defaultOptions.loaderApi;
  }

  displayLoadingUI = () => {
    this.loader.show();
  };

  hideLoadingUI = () => {
    this.loader.hide();
  };
}
