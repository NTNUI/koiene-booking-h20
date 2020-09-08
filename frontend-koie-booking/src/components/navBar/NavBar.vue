<template>
  <v-app-bar app color="backgroundLight" dark>
    <div>
      <v-btn target="_blank" text @click="goToAllKoier">
        <h1 class="headline">NTNUI Koiene</h1>
      </v-btn>
    </div>
    <v-spacer />
    <NavBarLogin />
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';
import NavBarLogin from './NavBarLogin.vue';

export default Vue.extend({
  name: 'App',
  components: {
    NavBarLogin
  },
  methods: {
    goToAllKoier() {
      if (this.$router.currentRoute.path !== '/') {
        this.$router.push(`/`);
      }
    }
  }
});
</script>

<style></style>
