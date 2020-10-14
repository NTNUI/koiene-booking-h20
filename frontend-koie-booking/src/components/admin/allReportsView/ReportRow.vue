<template>
  <tr>
    <td v-for="column in columnDataOptions" :key="column.value">
      <ChipWrapper v-if="column.colorAndText" :color="column.colorAndText[report[column.value]].color" />
      <StringDisplayer v-else :text="report[column.value].text" />
    </td>
  </tr>
</template>

<script lang="ts">
import Vue from 'vue';
import ReportTableColumns from '@/components/admin/allReportsView/ReportTableColumns';
import ChipWrapper from '@/components/admin/allReportsView/ChipWrapper.vue';
import StringDisplayer from '@/components/admin/allReportsView/StringDisplayer.vue';
import AdminReport from '@/types/admin/AdminReport';
import scssVars from '@/styles/variables.scss';

export default Vue.extend({
  name: 'ReportRow',
  components: { ChipWrapper, StringDisplayer },
  props: {
    report: {
      type: () => AdminReport,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      columnDataOptions: ReportTableColumns,
    };
  },
  mounted() {
    this.columnDataOptions['equipment'].columnDataOptions = [
      {
        color: scssVars.globalColorGreenStrong,
        text: this.report.equipment_ok.length,
      },
      {
        color: scssVars.globalColorYellow,
        text: this.report.equipment_not_sure.length,
      },
      {
        color: scssVars.globalColorRedStrong,
        text: this.report.equipment_not_ok.length,
      },
    ];
  },
});
</script>

<style scoped></style>
