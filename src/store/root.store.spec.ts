import { getters, RootState, initState } from "./root.store";
import { COMBINED_LANGUAGES_MAP, COUNTRY_CODE } from "./root.models";

describe("[rootStore]", () => {
  it("gets the translation $t", () => {
    const firstKey = Object.keys(COMBINED_LANGUAGES_MAP)[0];
    const state: RootState = initState;
    let $t = getters.$t(state, () => undefined, state, getters);
    expect($t[firstKey]).toEqual(
      COMBINED_LANGUAGES_MAP[firstKey][state.language.value]
    );
    state.language.value = COUNTRY_CODE.en;
    $t = getters.$t(state, () => undefined, state, getters);
    expect($t[firstKey]).toEqual(
      COMBINED_LANGUAGES_MAP[firstKey][COUNTRY_CODE.en]
    );
  });
});
