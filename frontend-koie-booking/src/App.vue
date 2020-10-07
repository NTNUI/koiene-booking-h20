<template>
  <v-app :style="{ background: $vuetify.theme.themes['dark'].background }">
    <NavBar />

    <v-content>
      <router-view />
      <notifications position="top center" group="memberships_system" :ignore-duplicates="true" :max="1" />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import NavBar from './components/navBar/NavBar.vue';

export default Vue.extend({
  name: 'App',
  components: {
    NavBar,
  },
});
</script>

<style lang="scss">
@import 'styles/variables.scss';
</style>
