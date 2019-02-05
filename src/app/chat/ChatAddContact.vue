<template>
  <v-dialog
    v-model="dialogOpen"
    max-width="500"
    @keydown.esc="dialogOpen = false"
  >
    <v-btn
      slot="activator"
      icon
      flat
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-card class="elevation-12">
      <v-form
        v-model="formValid"
        id="find-contact-form"
        ref="findContactForm"
        lazy-validation
        @submit.prevent="searchContact()"
      >
        <v-toolbar
          dark
          color="primary"
        >
          <v-toolbar-title>{{ $t.addContact }}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-text-field
            v-model="contact"
            :label="isEmailContact ? 'Email' : 'Phone number'"
            :rules="isEmailContact ? contactEmailRules : []"
            :prefix="isEmailContact ? '' : '+84'"
            :mask="isEmailContact ? undefined : '#### ### ####'"
            validate-on-blur
            type="text"
          ></v-text-field>
          <v-switch
            v-model="isEmailContact"
            label="Email contact?"
          ></v-switch>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            type="button"
            outline
            @click="dialogOpen = false"
          >{{ $t.cancel }}</v-btn>
          <v-btn
            form="find-contact-form"
            color="secondary"
            type="submit"
          >{{ $t.addContact }}</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State, Getter } from "vuex-class";
import {
  USERS_COLLECTION,
  IProfile,
  IMappedLanguage
} from "@/store/root.models";
import { CHATROOMS_COLLECTION } from "@/app/chat/chat.models";
import { fireStore, fireFunctions } from "@/firebase";
import { ITextFieldRule } from "@/app/shared/types";
import { ROOT_ACTIONS } from "@/store/root.store";
import { validateEmail } from "@/app/shared/validate-email.helper";
import { PHONE_COUNTRY_CODE } from "@/app/auth/auth.models";

@Component({
  name: "ChatAddContact"
})
export default class ChatAddContact extends Vue {
  @Getter("$t")
  public $t!: IMappedLanguage;
  @State("user")
  public user!: firebase.User;
  @State("userProfile")
  public userProfile!: IProfile;
  public dialogOpen: boolean = false;
  public formValid: boolean = false;
  public contact: string = "";
  public isEmailContact: boolean = true;
  public contactEmailRules: ITextFieldRule[] = [];

  public created() {
    this.contactEmailRules = [v => validateEmail(v) || this.$t.invalidEmail];
  }

  public async searchContact() {
    if ((this.$refs.findContactForm as any).validate() && this.user) {
      try {
        this.$store.dispatch(
          ROOT_ACTIONS.changeLoadingMessage,
          this.$t.creatingChatRoom
        );
        const findUserCallable = fireFunctions.httpsCallable("findUser");
        const result = await findUserCallable(
          this.isEmailContact
            ? { email: this.contact }
            : { phoneNumber: PHONE_COUNTRY_CODE + this.contact }
        );
        const newProfileContacts = this.userProfile.contacts;
        newProfileContacts.push(result.data.user);
        await fireStore
          .collection(USERS_COLLECTION)
          .doc(this.user.uid)
          .update({ contacts: newProfileContacts });
        this.$store.dispatch(ROOT_ACTIONS.changeUserProfile, {
          ...this.userProfile,
          contacts: newProfileContacts
        });
        this.$store.dispatch(ROOT_ACTIONS.finishLoading);
      } catch (error) {
        error.message = "Something wrong";
        this.$store.dispatch(ROOT_ACTIONS.changeError, error);
      } finally {
        this.dialogOpen = false;
        (this.$refs.findContactForm as any).reset();
      }
    }
  }
}
</script>
