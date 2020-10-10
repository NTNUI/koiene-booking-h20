<template>
  <div>
    <h2 style="text-align: center;">Oversikt over koierapporter</h2>
    <v-row justify="center">
      <ReportFilter />
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ReportFilter from '@/components/admin/reports/ReportFilter.vue';

export default Vue.extend({
  name: 'Reports',
  components: { ReportFilter },
});
</script>

<style scoped></style>
