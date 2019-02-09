import { AUTH_LANGUAGES } from "@/app/auth/auth.models";
import { HOME_LANGUAGES } from "@/app/home/home.models";
import { APP_LANGUAGES } from "@/app/core/app.models";
import { CHAT_LANGUAGES } from "@/app/chat/chat.models";

export const COMBINED_LANGUAGES_MAP: ILanguageMap = {
  ...APP_LANGUAGES,
  ...AUTH_LANGUAGES,
  ...HOME_LANGUAGES,
  ...CHAT_LANGUAGES
};

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

export interface IThemeSetting {
  value: string;
  text: string;
}

export const THEME_SETTINGS: IThemeSetting[] = [
  { value: "light", text: "Light" },
  { value: "dark", text: "Dark" }
];

export const USERS_COLLECTION = "users";

export const parseUser = (uid: string, data: any): IUser => ({
  uid,
  email: data.email || null,
  phoneNumber: data.phoneNumber || null
});

export const parseProfile = (data: any): IProfile => ({
  displayName: data.displayName || null,
  photoURL: data.photoURL || null
});

export interface IProfile {
  displayName: string;
  photoURL: string;
}

export interface IUser {
  uid: string;
  email: string | null;
  phoneNumber: string | null;
  displayName?: string | null;
  photoURL?: string | null;
}
