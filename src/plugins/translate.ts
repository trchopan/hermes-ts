import _Vue from "vue";

export enum COUNTRY_CODE {
  vi = "vi",
  en = "en"
}

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

const NO_TRANSLATION = "(no translation)";
const SHARED_TRANSLATE: ILanguageMap = {
  unknownError: {
    vi: "Lỗi không xác định. Vui lòng liên hệ admin.",
    en: "Unknown Error. Please contact admin."
  }
};

declare module "vue/types/vue" {
  interface Vue {
    $myPlugin: string;
    $translate(
      languageMap: ILanguageMap,
      countryCode: string
    ): IMappedLanguage;
    $format(str: string, inputs: string[]): string;
  }
}

export default function(Vue: typeof _Vue): void {
  // Translate language map based on country code
  Vue.prototype.$translate = (
    languageMap: ILanguageMap,
    countryCode: COUNTRY_CODE
  ): IMappedLanguage => {
    const combinedMap: ILanguageMap = { ...languageMap, ...SHARED_TRANSLATE };
    const result = Object.keys(combinedMap).reduce(
      (acc, key) => {
        acc[key] =
          combinedMap[key][countryCode] ||
          combinedMap[key].en ||
          NO_TRANSLATION;
        return acc;
      },
      {} as IMappedLanguage
    );

    return result;
  };

  // Format the str which has ${0}, ${1}, etc. with inputs string array
  Vue.prototype.$format = (str: string, inputs: string[]) => {
    let result = str;
    inputs.forEach(
      (input, index) => (result = result.replace(`{${index}}`, input))
    );
    return result;
  };
}
