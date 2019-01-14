<template>
  <div>
    <section id="home-header">
      <h1 class="display-1 primary--text">{{ $t.greeting }}</h1>
      <p>
        {{ $t.hello }}
        <span
          class="font-weight-bold secondary--text"
        >{{ $t.name }}</span>
      </p>
      <p>{{ $t.greetingText }}</p>
    </section>
    <section id="home-playgrounds">
      <h2 class="headline primary--text mb-3">{{ $t.skillLevel }}</h2>
      <v-layout
        row
        wrap
      >
        <v-flex
          v-for="skill in skills"
          xs12
          sm6
          md4
          :key="'skill-' + skill.title"
          class="mb-3 pl-3"
        >
          <div class="title secondary--text mb-3">
            <router-link :to="skill.route">{{ skill.title }}</router-link>
          </div>
          <v-rating
            readonly
            color="primary"
            :value="skill.level"
          ></v-rating>
          <div v-if="skill.interests.length > 0">
            <p class="subheading mt-2 mb-1">{{ $t.fieldsOfInterest }}</p>
            <ul>
              <li
                v-for="interest in skill.interests"
                :key="'interest-' + interest.name"
              >
                {{ interest.name }}
                <v-icon
                  small
                  @click="openInNew(interest.link)"
                >open_in_new</v-icon>
              </li>
            </ul>
          </div>
        </v-flex>
      </v-layout>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Route } from "vue-router";
import { LANGUAGES_MAP, SKILLS } from "./Home.models";

@Component({
  name: "Home"
})
export default class Home extends Vue {
  public skills = SKILLS;

  public beforeRouteEnter(to: Route, from: Route, next: any) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
    next();
  }

  get $t() {
    return this.$translate(LANGUAGES_MAP, this.$store.state.language.value);
  }

  public openInNew(link: string) {
    window.open(link, "_blank");
  }
}
</script>

<style lang="scss" scoped>
section > * {
  text-align: justify;
}
a {
  color: inherit;
}
</style>
