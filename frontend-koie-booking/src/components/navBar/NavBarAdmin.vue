<template ref="navBarAdmin">
  <v-btn id="navBarAdminButton" text @click="$router.push('/admin')">
    Admin
  </v-btn>
</template>

<script>
export default {
  name: 'NavBarAdmin'
};
</script>

<style scoped></style>
