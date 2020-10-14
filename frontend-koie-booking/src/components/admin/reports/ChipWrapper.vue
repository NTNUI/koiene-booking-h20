<template>
  <div @click="enableModal ? clickHandler : null">
    <StatusChip :chipText="ChipData.chipText" :chipColor="ChipData.chipColor" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import StatusChip from '@/components/admin/reports/StatusChip.vue';
import scssVars from '@/styles/variables.scss';

interface ChipData {
  chipText: string;
  chipColor: string;
}

export default Vue.extend({
  name: 'Reports',
  components: { StatusChip },
  props: {
    columnName: {
      type: String,
      default: '',
    },
    value: {
      type: Number,
      default: 0,
    },
    equipmentArray: {
      type: Array,
      default: null,
    },
  },
  computed: {
    columnIdentifier() {
      let color;
      let text;
      switch (this.columnName) {
        case 'gas':
          if (this.value === 0) {
            color = scssVars.globalColorRedStrong;
            text = 'Tomt';
          } else {
            color = scssVars.globalColorGreenStrong;
            text = 'Fullt';
          }
          break;
        case 'logs':
          break;
        case 'firewood':
          break;
        case 'boat':
          break;
        case 'canoe':
          break;
        case 'lifevest':
          break;
        case 'smokeDetector':
          break;
        case 'equipment':
          break;
      }
      return '';
    },
    woodScale() {
      let chipText;
      let chipColor;
      switch (this.value) {
        case 0:
          chipText = 'Tomt';
          chipColor = scssVars.globalColorRedStrong;
          break;
        case 1:
          chipText = 'Lite';
          chipColor = scssVars.globalColorRedWeak;
          break;
        case 2:
          chipText = 'Greit';
          chipColor = scssVars.globalColorYellow;
          break;
        case 3:
          chipText = 'Endel';
          chipColor = scssVars.globalColorGreenWeak;
          break;
        case 4:
          chipText = 'Mye';
          chipColor = scssVars.globalColorGreenStrong;
          break;
      }
      return 'hei';
    },
    boatScale() {},
  },
});
</script>

<style scoped></style>
