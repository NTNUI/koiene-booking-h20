<template>
  <tr>
    <td v-for="column in columnDataOptions" :key="column.value">
      {{ column }}
      <template v-if="column.value === 'equipment'">
        <ChipWrapper
          v-for="(option, index) in columnDataOptions['equipment'].colorAndTextOptions"
          :key="'option' + index"
          :color="columnDataOptions['equipment'].colorAndTextOptions[index].color"
          :text="columnDataOptions['equipment'].colorAndTextOptions[index].text"
        />
      </template>
      <ChipWrapper
        v-else-if="column.colorAndTextOptions"
        :color="getCorrectColorAndText(column, reportData).color"
        :text="getCorrectColorAndText(column, reportData).text"
      />
      <StringDisplayer v-else :text="'T: ' + reportData[column.value]" />
    </td>
  </tr>
</template>

<script lang="ts">
import Vue from 'vue';
import ChipWrapper from '@/components/admin/allReportsView/ChipWrapper.vue';
import StringDisplayer from '@/components/admin/allReportsView/StringDisplayer.vue';
import AdminReport from '@/types/admin/AdminReport';
import scssVars from '@/styles/variables.scss';
import { ColorAndText, ReportColumn } from '@/types/admin/ReportColumn';
import reportTableColumns from '@/components/admin/allReportsView/ReportTableColumns';

export default Vue.extend({
  name: 'ReportRow',
  components: { ChipWrapper, StringDisplayer },
  props: {
    report: {
      type: Object as () => any,
      default() {
        return null;
      },
    },
  },
  computed: {
    columnDataOptions() {
      const columnDataOptions: { [value: string]: ReportColumn } = reportTableColumns;
      columnDataOptions['equipment'].colorAndTextOptions = [
        {
          color: scssVars.globalColorGreenStrong,
          text: String(this.report.equipment_ok.length),
        },
        {
          color: scssVars.globalColorGrey,
          text: String(this.report.equipment_not_sure.length),
        },
        {
          color: scssVars.globalColorRedStrong,
          text: String(this.report.equipment_not_ok.length),
        },
      ];
      return columnDataOptions;
    },
    reportData() {
      const reportData: any = this.report;
      reportData['gas_is_full'] = reportData['gas_is_full'] ? 1 : 0;
      reportData['smoke_detector_is_working'] = reportData['smoke_detector_is_working'] ? 1 : 0;
      return reportData as AdminReport;
    },
  },
  methods: {
    getCorrectColorAndText(column: ReportColumn, report: AdminReport): ColorAndText {
      let chipColorAndText: ColorAndText;
      console.log(report[column.value]);
      try {
        chipColorAndText = column.colorAndTextOptions[report[column.value]];
      } catch (err) {
        console.log(err);
        chipColorAndText = { color: '#8E24AA', text: 'Feil ved lesing' };
      }
      return chipColorAndText;
    },
  },
});
</script>

<style scoped></style>
