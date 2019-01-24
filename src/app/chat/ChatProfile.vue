<template>
  <v-layout
    align-center
    justify-center
  >
    <v-flex
      xs12
      sm6
      md4
    >
      <v-card class="elevation-12">
        <v-form
          v-model="formValid"
          id="profile-update-form"
          ref="form"
          lazy-validation
          @submit.prevent="update()"
        >
          <v-toolbar
            dark
            color="primary"
          >
            <v-toolbar-title>{{ $t.editProfile }}</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-text-field
              v-if="user.email"
              prepend-icon="email"
              :label="$t.email"
              :value="user.email"
              type="text"
              disabled
            ></v-text-field>
            <v-text-field
              v-if="user.phoneNumber"
              prepend-icon="phone"
              :label="$t.phone"
              :value="user.phoneNumber"
              type="text"
              disabled
            ></v-text-field>
            <v-text-field
              v-model="userName"
              prepend-icon="person"
              name="user-name"
              :label="$t.displayName"
              type="text"
              validate-on-blur
              required
            ></v-text-field>
            <v-fade-transition mode="out-in">
              <div
                :key="'selected-image-'+selectedImage"
                class="selected-image"
              >
                <img
                  :src="'images/'+selectedImage"
                  alt="Selected Image"
                  @click="isSelecting = true"
                >
                <button
                  class="change-button white--text"
                  @click="isSelecting = true"
                >{{ $t.change }}</button>
              </div>
            </v-fade-transition>
            <v-expand-transition>
              <div
                v-show="isSelecting"
                key="image-list"
                class="image-list"
              >
                <img
                  v-for="(image, index) in profileImagesList"
                  :key="'image-' + index"
                  :src="'images/'+image"
                  @click="select(image)"
                >
              </div>
            </v-expand-transition>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              form="profile-update-form"
              color="secondary"
              type="submit"
              :loading="loading"
            >{{ $t.update }}</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import { State } from "vuex-class";
import Component from "vue-class-component";
import { ILanguageSetting } from "@/store/root.models";
import {
  LANGUAGES_MAP,
  EMPTY_PROFILE_IMAGE,
  PROFILE_IMAGES_LIST
} from "@/app/chat/chat.models";
import { ERROR_ACTIONS } from "@/store/error.store";
import { Watch } from "vue-property-decorator";

@Component({
  name: "ChatProfile"
})
export default class ChatProfile extends Vue {
  @State("language")
  public language!: ILanguageSetting;
  @State("user")
  public user!: firebase.User;
  public formValid: boolean = true;
  public loading: boolean = false;
  public isSelecting: boolean = false;
  public profileImagesList: string[] = PROFILE_IMAGES_LIST;
  public selectedImage: string | null = null;

  private _userName: string | null = null;

  get $t() {
    return this.$translate(LANGUAGES_MAP, this.language.value);
  }

  get userName(): string | null {
    return this.user.displayName;
  }

  set userName(name: string | null) {
    this._userName = name;
  }

  public created() {
    this.selectedImage = this.user.photoURL || EMPTY_PROFILE_IMAGE;
  }

  public select(image: string) {
    this.selectedImage = image;
    this.isSelecting = false;
  }

  public async update() {
    try {
      this.loading = true;
      await this.user.updateProfile({
        displayName: this._userName,
        photoURL: this.selectedImage
      });
      this.loading = false;
    } catch (error) {
      this.$store.dispatch(ERROR_ACTIONS.catchError, error);
    }
  }
}
</script>

<style lang="scss" scoped>
.selected-image {
  position: relative;
  border-radius: 50%;
  margin: auto;
  overflow: hidden;
  width: 10rem;
  height: 10rem;
  img {
    width: 100%;
  }
  .change-button {
    position: absolute;
    bottom: 0rem;
    left: 0;
    width: 100%;
    padding: 0.5rem;
    background: #00000099;
  }
}
.image-list {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(6rem, 1fr));
  img {
    width: 100%;
    border-radius: 50%;
    padding: 0.5rem;
  }
}
</style>
