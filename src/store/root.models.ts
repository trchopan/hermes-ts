export interface ISettings {
  value: string;
  text: string;
  icon?: string;
}

export const LANGUAGE_SETTINGS: ISettings[] = [
  { value: "vi", text: "🇻🇳 Tiếng Việt" },
  { value: "en", text: "🇬🇧 English" }
];

export const THEME_SETTINGS: ISettings[] = [
  { value: "light", text: "Light" },
  { value: "dark", text: "Dark" }
];
