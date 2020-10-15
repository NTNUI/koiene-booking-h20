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
import reportTableColumns from '@/components/admin/allReportsView/ReportTableColumns';
import getReportData from '../../../../tests/unit/__mocks__/reports';
import ReportRow from '@/components/admin/allReportsView/ReportRow.vue';
import AdminReport from '@/types/admin/AdminReport';

export default Vue.extend({
  name: 'AllReportsTable',
  components: { ReportRow },
  data() {
    return {
      headers: Object.values(reportTableColumns).map((column) => {
        delete column.colorAndTextOptions;
        return column;
      }),
    };
  },
  computed: {
    allReports(): Array<any> {
      // fill allReports with mock data
      let reports: Array<any> = [];
      for (let i = 0; i < 20; i++) {
        reports.push(getReportData());
      }
      return reports;
    },
  },
  methods: {},
});
</script>

<style scoped></style>
