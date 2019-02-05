import { createLocalVue } from "@vue/test-utils";
import Vuex, { Store } from "vuex";
import { getters, RootState } from "./root.store";
import { COMBINED_LANGUAGES_MAP, COUNTRY_CODE } from "./root.models";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("[rootStore]", () => {
  let store: Store<RootState>;
  const state: any = {
    language: {
      value: COUNTRY_CODE.vi
    }
  };

  beforeAll(() => {
    store = new Vuex.Store({ state, getters });
  });

  it("gets the translation $t", () => {
    const firstKey = Object.keys(COMBINED_LANGUAGES_MAP)[0];
    expect(store.getters.$t[firstKey]).toEqual(
      COMBINED_LANGUAGES_MAP[firstKey].vi
    );
    state.language.value = COUNTRY_CODE.en;
    expect(store.getters.$t[firstKey]).toEqual(
      COMBINED_LANGUAGES_MAP[firstKey].en
    );
  });
});
