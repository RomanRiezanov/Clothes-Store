import { setupI18n } from "@lingui/core";
import { en as enPlurals, uk as ukPlurals } from "make-plural/plurals";

// messages
import { messages as translationsEn } from "../../locales/en/messages";
import { messages as translationsUk } from "../../locales/uk/messages";

// types
import type { Language } from "./locale.types";

export function getI18nInstance(language: Language) {
  const i18n = setupI18n({
    locale: language,
    localeData: { en: { plurals: enPlurals }, uk: { plurals: ukPlurals } },
    messages: { en: translationsEn, uk: translationsUk },
  });
  return i18n;
}
