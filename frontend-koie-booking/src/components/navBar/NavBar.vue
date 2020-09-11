<template>
  <v-app-bar app color="backgroundLight" dark>
    <div>
      <v-btn target="_blank" text @click="goToAllKoier">
        <h1 class="headline">NTNUI Koiene</h1>
      </v-btn>
    </div>
    <v-spacer />
    <NavBarAdmin v-if="isAdmin" style="margin-right: 10px" />
    <NavBarLogin :is-logged-in="isLoggedIn" />
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';
import NavBarLogin from './NavBarLogin.vue';
import NavBarAdmin from '@/components/navBar/NavBarAdmin.vue';

export default Vue.extend({
  name: 'NavBar',
  components: {
    NavBarAdmin,
    NavBarLogin
  },
  computed: {
    isAdmin(): boolean {
      return this.$store.getters['auth/isAdmin'] || false;
    },
    isLoggedIn(): boolean {
      return this.$store.getters['auth/isLoggedIn'] || false;
    }
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
