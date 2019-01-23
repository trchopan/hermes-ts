<template>
  <pre>Hi {{ user | json }}</pre>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State } from "vuex-class";
import { ILanguageSetting } from "@/store/root.models";
import { Watch } from "vue-property-decorator";
import { LANGUAGES_MAP } from "@/app/chat/chat.models";

@Component({
  name: "Chat"
})
export default class Chat extends Vue {
  @State("language")
  public language!: ILanguageSetting;
  @State("user")
  public user!: firebase.User;

  get $t() {
    return this.$translate(LANGUAGES_MAP, this.language.value);
  }

  @Watch("user")
  public onUserChange(val: firebase.User, oldVal: firebase.User) {
    if (val) {
      this.$router.replace("/auth");
    }
  }
}
</script>
