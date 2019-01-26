<template>
  <v-card class="elevation-12">
    <v-form
      v-model="formValid"
      id="edit-profile-form"
      ref="editProfileForm"
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
          v-model="displayName"
          prepend-icon="person"
          name="display-name"
          :label="$t.displayName"
          type="text"
          :rules="displayNameRules"
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
              @click="isSelecting = !isSelecting"
            >
            <button
              class="change-button white--text"
              type="button"
              @click="isSelecting = !isSelecting"
            >{{ $t.change }}</button>
          </div>
        </v-fade-transition>
        <v-expand-transition>
          <div
            v-show="isSelecting"
            key="image-list"
            class="image-list"
          >
            <div
              v-for="(image, index) in profileImagesList"
              :key="'image-' + index"
              class="image-container"
            >
              <img
                :src="'images/'+image"
                @mouseover="$event.target.classList.add('elevation-12')"
                @mouseleave="$event.target.classList.remove('elevation-12')"
                @click="select(image)"
              >
            </div>
          </div>
        </v-expand-transition>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          form="edit-profile-form"
          color="secondary"
          type="submit"
          :loading="loading"
        >{{ $t.update }}</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
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
import { ITextFieldRule } from "@/app/shared/types";

@Component({
  name: "ChatEditProfile"
})
export default class ChatEditProfile extends Vue {
  @State("language")
  public language!: ILanguageSetting;
  @State("user")
  public user!: firebase.User;
  public formValid: boolean = true;
  public loading: boolean = false;
  public isSelecting: boolean = false;
  public profileImagesList: string[] = PROFILE_IMAGES_LIST;
  public selectedImage: string | null = null;
  public displayNameRules: ITextFieldRule[] = [];

  private _displayName: string | null = null;

  get $t() {
    return this.$translate(LANGUAGES_MAP, this.language.value);
  }

  get displayName(): string | null {
    return this.user.displayName;
  }

  set displayName(name: string | null) {
    this._displayName = name;
  }

  public created() {
    this.selectedImage = this.user.photoURL || EMPTY_PROFILE_IMAGE;
    this.displayNameRules = [
      v => (v && v.length > 3) || this.$t.invalidDisplayName
    ];
  }

  public select(image: string) {
    this.selectedImage = image;
    this.isSelecting = false;
  }

  public async update() {
    if ((this.$refs.editProfileForm as any).validate()) {
      try {
        this.loading = true;
        await this.user.updateProfile({
          displayName: this._displayName,
          photoURL: this.selectedImage
        });
        this.loading = false;
        this.$emit("profileUpdated", true);
      } catch (error) {
        this.$store.dispatch(ERROR_ACTIONS.catchError, error);
      }
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
  .image-container {
    width: 100%;
    padding: 0.5rem;
    img {
      border-radius: 50%;
      width: 100%;
      filter: brightness(60%);
      transition: all 150ms ease-in;
    }
    img:hover {
      cursor: pointer;
      transform: scale(1.05);
      filter: brightness(100%);
    }
  }
}
</style>
