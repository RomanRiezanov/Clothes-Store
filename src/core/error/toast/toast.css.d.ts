declare namespace ToastCssNamespace {
  export interface IToastCss {
    buttonWrapper: string;
    closeButton: string;
    error: string;
    errorMessage: string;
    errorTitle: string;
    hideToast: string;
    image: string;
    showToast: string;
    toast: string;
    toastHide: string;
    toastsWrapper: string;
  }
}

declare const ToastCssModule: ToastCssNamespace.IToastCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ToastCssNamespace.IToastCss;
};

export = ToastCssModule;
