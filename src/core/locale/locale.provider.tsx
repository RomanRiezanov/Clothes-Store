import { I18nProvider } from "@lingui/react";
import React from "react";

import { RedirectError } from "../error/error";

// consts
import { defaultLanguage, languages } from "./locale.const";

// types
import type { Language, LocalesContext, Props, State } from "./locale.types";

export const localesContext = React.createContext<LocalesContext>(undefined!);

export class LocalesProvider extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      // eslint-disable-next-line react/no-unused-state
      i18n: props.i18n,
    };
  }

  static validateLanguage(
    possibleLanguage: string | null | undefined
  ): Language {
    if (possibleLanguage === undefined) {
      return defaultLanguage;
    }
    const language = languages.find((lang) => lang.key === possibleLanguage);
    if (language) {
      return language.key;
    }
    throw new RedirectError(`Language ${possibleLanguage} is not supported`, {
      code: 308,
      data: { url: "/" },
      stack: `Language ${possibleLanguage} is not supported`,
    });
  }

  render() {
    const { i18n, children } = this.props;
    return (
      <localesContext.Provider value={this.state}>
        <I18nProvider i18n={i18n}>{children}</I18nProvider>
      </localesContext.Provider>
    );
  }
}
