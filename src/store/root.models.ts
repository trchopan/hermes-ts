import { COUNTRY_CODE } from "@/plugins/translate";

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
