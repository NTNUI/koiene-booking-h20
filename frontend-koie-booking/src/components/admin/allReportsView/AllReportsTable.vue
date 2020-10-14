<template>
  <v-data-table
    style="width: 100%"
    :headers="headers"
    :items="allCabinsWithBookings"
    :items-per-page="24"
    :hide-default-footer="true"
    loading-text="Henter inn rapporter"
    no-data-text="Det skjedde noe feil da vi prøvde å hente rapporter"
  />
</template>

<script lang="ts">
import Vue from 'vue';
import reportTableHeaders from '@/components/admin/allReportsView/ReportTableHeaders';

export default Vue.extend({
  name: 'AllReportsTable',
  data() {
    return {
      headers: reportTableHeaders,
    };
  },
  computed: {},
  methods: {},
});
</script>

<style scoped></style>
