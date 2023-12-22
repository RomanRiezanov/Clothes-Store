declare namespace SpinnerCssNamespace {
  export interface ISpinnerCss {
    blue: string;
    dark: string;
    grey: string;
    large: string;
    medium: string;
    red: string;
    small: string;
    spin: string;
    spinner: string;
    tiny: string;
    white: string;
    wrapper: string;
  }
}

declare const SpinnerCssModule: SpinnerCssNamespace.ISpinnerCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SpinnerCssNamespace.ISpinnerCss;
};

export = SpinnerCssModule;
