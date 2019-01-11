import { createLocalVue } from "@vue/test-utils";
import Translate, { ILanguageMap } from "./translate";

const localVue = createLocalVue();

describe("[plugins]translate", () => {
  const LANGUAGES_MAP: ILanguageMap = {
    hello: {
      vi: "Xin chào, tên tôi là",
      en: "Hi, My name is"
    }
  };
  beforeAll(() => {
    Translate(localVue);
  });
  it("translate", () => {
    const $translate = localVue.prototype.$translate;
    expect($translate).toBeDefined();
    const $t = $translate(LANGUAGES_MAP, "en");
    expect($t.hello).toBe(LANGUAGES_MAP.hello.en);
  });
  it("format", () => {
    const $format = localVue.prototype.$format;
    expect($format).toBeDefined();
    const result = $format("test {0} {1}", ["0", "1"]);
    expect(result).toBe("test 0 1");
  });
});
