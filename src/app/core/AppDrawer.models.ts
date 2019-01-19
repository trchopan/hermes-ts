import { ILanguageMap } from "@/plugins/translate";
import { AUTH_ROUTE } from "@/app/auth/auth.routes";

export const LANGUAGES_MAP: ILanguageMap = {
  home: { vi: "Trang chủ", en: "Home" },
  playground: { vi: "Sân chơi", en: "Playground" },
  authSystem: { vi: "Xác thực tài khoản", en: "Authentication System" },
  machineLearning: { vi: "Máy tính tự học", en: "Machine Learning" }
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
      { path: AUTH_ROUTE, name: "authSystem" },
      { path: "machine-learning", name: "machineLearning" }
    ]
  }
];
