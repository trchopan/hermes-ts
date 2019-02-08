import { createLocalVue } from "@vue/test-utils";
import Vuex, { Store } from "vuex";
import {
  getters,
  actions,
  mutations,
  RootState,
  ROOT_ACTIONS
} from "./root.store";
import {
  COMBINED_LANGUAGES_MAP,
  COUNTRY_CODE,
  IProfile,
  IUser
} from "./root.models";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("[rootStore]", () => {
  let store: Store<RootState>;
  const mockUser: IUser = {
    uid: "abc123",
    displayName: "tester",
    photoURL: "photo.jpg",
    email: "test@example.com",
    phoneNumber: ""
  };
  const state: any = {
    user: mockUser,
    error: null,
    language: {
      value: COUNTRY_CODE.vi
    }
  };

  const editUserCallable = jest.fn().mockRejectedValue({ code: "error" });

  beforeAll(() => {
    store = new Vuex.Store({
      state,
      getters,
      actions: actions(editUserCallable),
      mutations
    });
  });

  it("getters.$t gets the translation", () => {
    const firstKey = Object.keys(COMBINED_LANGUAGES_MAP)[0];
    expect(store.getters.$t[firstKey]).toEqual(
      COMBINED_LANGUAGES_MAP[firstKey].vi
    );
    store.dispatch(ROOT_ACTIONS.changeLanguage, COUNTRY_CODE.en);
    expect(store.getters.$t[firstKey]).toEqual(
      COMBINED_LANGUAGES_MAP[firstKey].en
    );
  });

  it("actions.editUser catches error", async () => {
    const newProfile: IProfile = {
      displayName: "tester",
      photoURL: "photo.jpg"
    };
    await store.dispatch(ROOT_ACTIONS.editUser, newProfile);
    expect(editUserCallable).toBeCalledWith(newProfile);
    expect(store.state.error).toEqual({
      code: "error",
      message: store.getters.$t.errorEditingUser
    });
  });
});
