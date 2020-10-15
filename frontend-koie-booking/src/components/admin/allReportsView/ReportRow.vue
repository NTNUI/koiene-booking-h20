<template>
  <tr>
    <td v-for="column in columnDataOptions" :key="column.value">
      <template v-if="column.value === 'equipment'">
        <ChipWrapper
          :color="columnDataOptions['equipment'].colorAndTextOptions[0].color"
          :text="columnDataOptions['equipment'].colorAndTextOptions[0].text"
        />
        <ChipWrapper
          :color="columnDataOptions['equipment'].colorAndTextOptions[1].color"
          :text="columnDataOptions['equipment'].colorAndTextOptions[1].text"
        />
        <ChipWrapper
          :color="columnDataOptions['equipment'].colorAndTextOptions[2].color"
          :text="columnDataOptions['equipment'].colorAndTextOptions[2].text"
        />
      </template>
      <ChipWrapper
        v-else-if="column.colorAndTextOptions"
        :color="getCorrectColorAndText(column, report).color"
        :text="getCorrectColorAndText(column, report).text"
      />
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
import { ColorAndText, ReportColumn } from '@/types/admin/ReportColumn';

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
    this.columnDataOptions['equipment'].colorAndTextOptions = [
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
  methods: {
    getCorrectColorAndText(column: ReportColumn, report: AdminReport): ColorAndText {
      let chipColorAndText: ColorAndText;
      try {
        chipColorAndText = column.colorAndTextOptions[report[column.value]];
      } catch (err) {
        console.log(err);
        chipColorAndText = { color: 'grey', text: 'Error when setting chip data' };
      }
      return chipColorAndText;
    },
  },
});
</script>

<style scoped></style>
