<template>
  <div>
    <h2 style="text-align: center;">Oversikt over koierapporter</h2>
    <v-row justify="center">
      <ReportsFilter />
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ReportsFilter from '@/components/admin/allReportsView/ReportsFilter.vue';

export default Vue.extend({
  name: 'Reports',
  components: { ReportsFilter },
});
</script>

<style scoped></style>
