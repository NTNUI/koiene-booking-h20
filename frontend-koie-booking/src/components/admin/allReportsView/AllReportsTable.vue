<template>
  <v-data-table
    style="width: 100%"
    :headers="headers"
    :items="allReports"
    :items-per-page="24"
    :hide-default-footer="true"
    loading-text="Henter inn rapporter"
    no-data-text="Det skjedde noe feil da vi prøvde å hente rapporter"
  >
    <template slot="item" slot-scope="row">
      <ReportRow :report="row.item" />
    </template>
  </v-data-table>
</template>

<script lang="ts">
import Vue from 'vue';
import { reportTableHeaders } from '@/components/admin/allReportsView/ReportTableHeaders';
import getReportData from '../../../../tests/unit/__mocks__/reports';
import ReportRow from '@/components/admin/allReportsView/ReportRow.vue';
import AdminReport from '@/types/admin/APIAdminReport';

export default Vue.extend({
  name: 'AllReportsTable',
  components: { ReportRow },
  data() {
    return {
      headers: reportTableHeaders,
    };
  },
  computed: {
    allReports(): Array<AdminReport> {
      return this.$store.getters['adminReports/getReportArray'];
    },
  },
  mounted() {
    this.$store.dispatch('adminReports/MOUNT_REPORTS');
  },
  methods: {},
});
</script>

<style scoped></style>
