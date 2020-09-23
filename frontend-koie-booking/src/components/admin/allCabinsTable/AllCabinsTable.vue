<template>
  <v-row justify="center">
    <h4>Her kommer tabell over alle hytter</h4>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import store from '@/store/index';

export default Vue.extend({
  name: 'AllCabinsTable',
  mounted() {
    store.dispatch('adminBookings/mountCabinsWithBookings', { startDate: '2020-09-23', endDate: '2020-09-30' });
  }
});
</script>

<style scoped></style>
