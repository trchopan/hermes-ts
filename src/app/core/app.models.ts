import { ILanguageMap } from "@/plugins/translate";
import { CHAT_ROUTE } from "@/app/chat/chat.routes";

export const LANGUAGES_MAP: ILanguageMap = {
  home: {
    vi: "Trang chủ",
    en: "Home"
  },
  playground: {
    vi: "Sân chơi",
    en: "Playground"
  },
  chat: {
    vi: "Chat",
    en: "Chat"
  },
  authSystem: {
    vi: "Xác thực tài khoản",
    en: "Authentication System"
  },
  machineLearning: {
    vi: "Máy tính tự học",
    en: "Machine Learning"
  },
  notice: {
    vi: "Thông báo",
    en: "Notice"
  },
  dismiss: {
    vi: "Đóng",
    en: "Dismiss"
  },
  selectLanguage: {
    vi: "Chọn ngôn ngữ",
    en: "Select language"
  },
  lightOut: {
    vi: "Tắt đèn",
    en: "Light out"
  },
  signOut: {
    vi: "Đăng xuất",
    en: "Sign Out"
  }
};

export interface IDrawerItem {
  path?: string;
  name: string;
  icon?: string;
  children?: IDrawerItem[];
}

export const DRAWER_ITEMS: IDrawerItem[] = [
  { path: "/", name: "home", icon: "home" },
  {
    name: "playground",
    icon: "dashboard",
    children: [
      { path: CHAT_ROUTE, name: "chat" }
    ]
  }
];
