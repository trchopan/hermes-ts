import { getters } from "./root.store";
import { COMBINED_LANGUAGES_MAP, COUNTRY_CODE } from "./root.models";

describe("[rootStore]", () => {
  it("gets the translation $t", () => {
    const firstKey = Object.keys(COMBINED_LANGUAGES_MAP)[0];
    const state: any = {
      language: {
        value: COUNTRY_CODE.vi
      }
    };
    let $t = getters.$t(state, () => undefined, state, getters);
    expect($t[firstKey]).toEqual(COMBINED_LANGUAGES_MAP[firstKey].vi);
    state.language.value = COUNTRY_CODE.en;
    $t = getters.$t(state, () => undefined, state, getters);
    expect($t[firstKey]).toEqual(COMBINED_LANGUAGES_MAP[firstKey].en);
  });
});
