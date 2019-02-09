<template>
  <v-layout
    ref="chatView"
    column
  >
    <v-layout
      v-if="loadingChat"
      justify-center
      align-center
      column
      fill-height
    >
      <v-progress-circular
        indeterminate
        :width="3"
        :size="62"
        color="primary"
        class="ma-3"
      ></v-progress-circular>
      <p>{{ $t.loadingChat }}</p>
    </v-layout>
    <v-layout
      v-if="!loadingChat && chatContents.length === 0"
      justify-center
      align-center
      column
      fill-height
    >
      <v-icon size="50">mood</v-icon>
      <p>{{ $t.noMessage }}</p>
    </v-layout>
    <v-flex v-else>
      <v-layout
        v-for="chat in chatContents"
        :key="'chat-' + chat.timestamp"
        align-center
      >
        <v-spacer v-if="chat.senderId === user.uid"></v-spacer>
        <v-avatar
          v-else
          size="3rem"
        >
          <img
            :src="'/images/'+receiverPhotoUrl"
            alt="User avatar"
          >
        </v-avatar>
        <v-card
          dark
          class="ma-2"
          :color="chat.senderId === user.uid ? 'primary' : 'secondary'"
        >
          <v-card-text>
            <div>{{ chat.message }}</div>
            <div
              class="font-weight-light caption"
              :class="chat.senderId === user.uid ? 'text-xs-right' : ''"
            >
              <span>{{ chat.timestamp | dateFormat(language.value) }}</span>
              <span
                v-if="chat.senderId === user.uid"
              >{{ chat.delivered ? "✓": "..."}}</span>
            </div>
          </v-card-text>
        </v-card>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State, Getter } from "vuex-class";
import {
  ILanguageSetting,
  IUser,
  USERS_COLLECTION,
  IMappedLanguage
} from "@/store/root.models";
import { Watch } from "vue-property-decorator";
import { ROOT_ACTIONS } from "@/store/root.store";

@Component({
  name: "ChatUser"
})
export default class ChatUser extends Vue {
  @Getter
  public $t!: IMappedLanguage;

  public created() {

  }

  public destroyed() {

  }

  public scrollDown() {
    const chatView = this.$refs.chatView as any;
    chatView.scroll({
      top: chatView.scrollHeight,
      behavior: "smooth"
    });
  }
}
</script>
