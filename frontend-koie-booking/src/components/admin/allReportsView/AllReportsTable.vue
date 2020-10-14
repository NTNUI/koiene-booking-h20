<template>
  <v-data-table
    style="width: 100%"
    :headers="headers"
    :items="allCabinsWithBookings"
    :items-per-page="24"
    :hide-default-footer="true"
    loading-text="Henter inn rapporter"
    no-data-text="Det skjedde noe feil da vi prøvde å hente rapporter"
  >
  </v-data-table>
</template>

<script lang="ts">
import Vue from 'vue';
import reportTableColumns from '@/components/admin/allReportsView/ReportTableColumns';

export default Vue.extend({
  name: 'AllReportsTable',
  components: {},
  data() {
    return {
      headers: Object.values(reportTableColumns).map((column) => {
        delete column.colorAndText;
        return column;
      }),
    };
  },
  computed: {},
  methods: {},
});
</script>

<style scoped></style>
