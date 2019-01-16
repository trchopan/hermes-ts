import { COUNTRY_CODE } from "@/plugins/translate";

export interface ILanguageSetting {
  value: COUNTRY_CODE;
  text: string;
}

export const LANGUAGE_SETTINGS: ILanguageSetting[] = [
  { value: COUNTRY_CODE.vi, text: "🇻🇳 Tiếng Việt" },
  { value: COUNTRY_CODE.en, text: "🇬🇧 English" }
];

export interface IThemeSetting {
  value: string;
  text: string;
}

export const THEME_SETTINGS: IThemeSetting[] = [
  { value: "light", text: "Light" },
  { value: "dark", text: "Dark" }
];
