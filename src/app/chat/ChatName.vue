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
          v-model="fromValid"
          id="user-name-form"
          ref="form"
          lazy-validation
          @submit.prevent="submit()"
        >
          <v-toolbar color="warn">
            <v-toolbar-title>{{ $t.signIn }}</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-text-field
              v-model="userName"
              prepend-icon="person"
              name="user-name"
              label="Username"
              type="text"
              validate-on-blur
              required
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              form="sign-up-form"
              color="secondary"
              type="submit"
              :loading="loading"
            >{{ $t.signIn }}</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
      <div class="text-xs-center mt-3">
        <v-btn
          color="primary"
          outline
          :to="signUpEmailRoute"
        >{{ $t.signUp }}</v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import { State } from "vuex-class";
import Component from "vue-class-component";
import { ILanguageSetting } from "@/store/root.models";

@Component({
  name: "ChatName"
})
export default class ChatName extends Vue {
  @State("language")
  public language!: ILanguageSetting;
}
</script>
