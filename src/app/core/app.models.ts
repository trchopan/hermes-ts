import { ILanguageMap } from "@/store/root.models";
import { CHAT_ROUTE } from "@/app/chat/chat.models";
import { HOME_ROUTE } from "@/app/home/home.models";

export const APP_LANGUAGES: ILanguageMap = {
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
  },
  errorGettingUser: {
    vi: "Lỗi truy cập thông tin của bạn",
    en: "Error when getting your information"
  },
  errorEditingUser: {
    vi: "Lỗi thay đổi thông tin của bạn",
    en: "Error when editing your information"
  }
};

export interface IDrawerItem {
  path?: string;
  name: string;
  icon?: string;
  children?: IDrawerItem[];
}

export const DRAWER_ITEMS: IDrawerItem[] = [
  { path: HOME_ROUTE, name: "home", icon: "home" },
  {
    name: "playground",
    icon: "dashboard",
    children: [{ path: CHAT_ROUTE, name: "chat" }]
  }
];
