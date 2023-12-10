import type { Language, Languages } from "./locale.types";

export const languages: Languages = [
  {
    title: "English",
    key: "en",
  },
  {
    title: "Ukraine",
    key: "uk",
  },
];

export const defaultLanguage: Language = languages[0].key;
