<template>
  <v-btn
    v-if="$route.path !== '/login'"
    :color="this.$scssVars.globalColorPrimary"
    class="mr-4"
    @click="!isLoggedIn ? routeLogin() : logOut()"
  >
    {{ !isLoggedIn ? $t('ntnui.login.login') : $t('ntnui.login.logout') }}
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';

export default Vue.extend({
  name: 'NavBarLogin',
  computed: {
    isLoggedIn(): boolean {
      const isLoggedIn = this.$store.getters['auth/getToken'];
      return isLoggedIn ? isLoggedIn.length !== 0 : false;
    }
  },
  methods: {
    routeLogin() {
      this.$router.push({ name: 'Login', query: { redirect: this.$route.path } });
    },
    logOut() {
      this.$store.dispatch('auth/deleteTokens');
      if (this.$route.meta.requiresAuth) {
        this.$router.push('/');
      }
    }
  }
});
</script>

<style></style>
