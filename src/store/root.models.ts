import { AUTH_LANGUAGES } from "@/app/auth/auth.models";

export enum COUNTRY_CODE {
  vi = "vi",
  en = "en"
}

export interface IError {
  message: string;
  code: string;
}

export interface ILanguageSetting {
  value: COUNTRY_CODE;
  text: string;
}

export const LANGUAGE_SETTINGS: ILanguageSetting[] = [
  { value: COUNTRY_CODE.vi, text: "🇻🇳 Tiếng Việt" },
  { value: COUNTRY_CODE.en, text: "🇬🇧 English" }
];

export interface ILanguage {
  vi: string;
  en: string;
}

export interface ILanguageMap {
  [key: string]: ILanguage;
}

export interface IMappedLanguage {
  [key: string]: string;
}

export const NO_TRANSLATION = "(no translation)";

export const COMBINED_LANGUAGES_MAP: ILanguageMap = {
  ...AUTH_LANGUAGES
};

export interface IThemeSetting {
  value: string;
  text: string;
}

export const THEME_SETTINGS: IThemeSetting[] = [
  { value: "light", text: "Light" },
  { value: "dark", text: "Dark" }
];

export const USERS_COLLECTION = "users";

export const parseProfile = (data: any): IProfile => ({
  init: data.init !== undefined ? data.init : false,
  contacts: data.contacts !== undefined ? data.contacts : []
});

export interface IProfile {
  init: boolean;
  contacts: string[];
}

export interface IUser {
  uid: string;
  data: {
    displayName: string;
    photoURL: string;
    email: string;
    phoneNumber: string;
  } | null;
}
