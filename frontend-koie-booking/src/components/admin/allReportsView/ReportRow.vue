<template>
  <tr>
    <td v-for="header in reportTableHeaders" :key="header.value">
      <EquipmentColumnDisplayer
        v-if="header.value === 'equipment'"
        :not-ok="report.equipmentNotOk"
        :not-sure="report.equipmentNotSure"
        :ok="report.equipmentOk"
      />
      <template v-else-if="report[header.value] !== undefined">
        <StatusChip
          v-if="reportTableColumns[header.value]"
          :color="getCorrectColorAndText(header.value).color"
          :text="String(getCorrectColorAndText(header.value).text)"
        />
        <StringDisplayer v-else :text="report[header.value]" />
      </template>
      <StringDisplayer v-else text="Fant ikke data for dette punktet" />
    </td>
  </tr>
</template>

<script lang="ts">
import Vue from 'vue';
import EquipmentColumnDisplayer from '@/components/admin/allReportsView/EquipmentColumnDisplayer.vue';
import StatusChip from '@/components/admin/allReportsView/StatusChip.vue';
import StringDisplayer from '@/components/admin/allReportsView/StringDisplayer.vue';
import { ColorAndText } from '@/types/admin/ReportColumn';
import { reportTableColumns } from '@/components/admin/allReportsView/ReportTableColumns';
import { reportTableHeaders } from '@/components/admin/allReportsView/ReportTableHeaders';

export default Vue.extend({
  name: 'ReportRow',
  components: { EquipmentColumnDisplayer, StatusChip, StringDisplayer },
  props: {
    report: {
      type: Object as () => any,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      reportTableHeaders,
      reportTableColumns,
    };
  },
  methods: {
    getCorrectColorAndText(header: string): ColorAndText {
      let chipColorAndText: ColorAndText;
      const options = reportTableColumns[header].colorAndTextOptions;
      try {
        chipColorAndText = options[this.report[header] as number];
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
