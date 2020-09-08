<template>
  <v-container fill-height>
    <v-container class="global-max-width">
      <v-row class="mx-auto">
        <v-col align="center" class="mt-5" cols="12" lg="12" sm="12" md="12">
          <v-progress-circular
            :size="70"
            :width="7"
            :color="this.$scssVars.globalColorSecondary"
            indeterminate
          ></v-progress-circular>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({ name: 'LoadingSpinner' });
</script>

<style></style>
