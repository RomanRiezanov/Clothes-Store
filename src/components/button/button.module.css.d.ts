declare namespace ButtonCssNamespace {
  export interface IButtonCss {
    auto: string;
    button: string;
    danger: string;
    dark: string;
    default: string;
    full: string;
    medium: string;
    outline: string;
    primary: string;
    secondary: string;
    small: string;
    spinner: string;
  }
}

declare const ButtonCssModule: ButtonCssNamespace.IButtonCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ButtonCssNamespace.IButtonCss;
};

export = ButtonCssModule;
