import type { I18n } from "@lingui/core";
import { ReactNode } from "react";

export type State = {
  i18n: I18n;
};

export type Props = {
  i18n: I18n;
  children: ReactNode;
};

export type LocalesContext = {
  i18n: I18n;
};

export type Language = "en" | "uk";
export type Languages = { title: string; key: Language }[];
