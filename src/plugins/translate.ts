import _Vue from "vue";

export interface ILanguage {
  vi: string;
  en: string;
}

export interface ILanguageMap {
  [key: string]: ILanguage;
}

export enum COUNTRY_CODE {
  vi = "vi",
  en = "en"
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
      countryCode: COUNTRY_CODE
    ): { [key: string]: string };
    $format(str: string, inputs: string[]): string;
  }
}

export default function(Vue: typeof _Vue): void {
  // Translate language map based on country code
  Vue.prototype.$translate = (
    languageMap: ILanguageMap,
    countryCode: COUNTRY_CODE
  ): { [key: string]: string } => {
    const combinedMap: ILanguageMap = { ...languageMap, ...SHARED_TRANSLATE };
    const result = Object.keys(combinedMap).reduce(
      (acc, key) => {
        acc[key] =
          combinedMap[key][countryCode] ||
          combinedMap[key].en ||
          NO_TRANSLATION;
        return acc;
      },
      {} as { [key: string]: string }
    );

    return result;
  };

  // Format the str which has ${0}, ${1}, etc. with inputs string array
  Vue.prototype.$format = (str: string, inputs: string[]) => {
    if (
      typeof str !== "string" ||
      !inputs ||
      !inputs.hasOwnProperty("length")
    ) {
      return str;
    }
    let result = str;
    inputs.forEach(
      (input, index) => (result = result.replace(`{${index}}`, input))
    );
    return result;
  };
}
