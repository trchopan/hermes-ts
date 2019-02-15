import { createLocalVue } from "@vue/test-utils";
import Vuex, { Store } from "vuex";
import {
  COMBINED_LANGUAGES_MAP,
  COUNTRY_CODE,
  IProfile,
  IUser
} from "./root.models";
import {
  RootState,
  actions,
  getters,
  mutations,
  ROOT_ACTIONS
} from "./root.store";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("[rootStore]", () => {
  let store: Store<RootState>;
  const mockUser: IUser = {
    uid: "abc123",
    email: "test@example.com",
    phoneNumber: null
  };
  const mockProfile: IProfile = {
    displayName: "tester",
    photoURL: "photo.jpg"
  };
  const state: any = {
    user: mockUser,
    error: null,
    language: {
      value: COUNTRY_CODE.vi
    }
  };

  const editUserCallable = jest.fn().mockRejectedValue({ code: "error" });
  const stubFirestore = {
    collection: jest
      .fn()
      .mockImplementationOnce(() => ({
        doc: () => ({
          onSnapshot: (cb: any) => {
            return cb({
              exists: false
            });
          }
        })
      }))
      .mockImplementationOnce(() => ({
        doc: () => ({
          onSnapshot: (cb: any) => {
            return cb({
              exists: true,
              data: () => mockProfile
            });
          }
        })
      }))
  } as any;

  beforeAll(() => {
    store = new Vuex.Store({
      state,
      getters,
      actions: actions(stubFirestore, editUserCallable),
      mutations
    });
  });

  it("changeUser and parse profile correctly", () => {
    store.dispatch(ROOT_ACTIONS.changeUser, null);
    expect(store.state.user).toEqual(null);
    store.dispatch(ROOT_ACTIONS.changeUser, mockUser);
    expect(store.state.error).toBeTruthy();
    expect(store.state.error!.message).toEqual(
      store.getters.$t.errorGettingUser
    );
    store.dispatch(ROOT_ACTIONS.changeUser, mockUser);
    expect(store.state.user).toEqual({
      ...mockUser,
      ...mockProfile
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
