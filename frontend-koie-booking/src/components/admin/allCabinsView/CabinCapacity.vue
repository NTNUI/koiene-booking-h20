<template>
  <div :style="style">
    <span>{{ numberOfBeds - availableBeds }} / {{ numberOfBeds }}</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import scssVars from '@/styles/variables.scss';

export default Vue.extend({
  name: 'CabinCapacity',
  props: {
    availableBeds: {
      type: Number,
      default: 0,
    },
    numberOfBeds: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    style() {
      const progress = this.numberOfBeds === 0 ? -1 : Math.floor((this.availableBeds / this.numberOfBeds) * 100);
      return {
        color: 'white',
        width: '90%',
        height: '90%',
        margin: 'auto',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background:
          progress === 0
            ? scssVars.globalColorRedStrong
            : progress >= 99
            ? scssVars.globalColorGreenStrong
            : 'linear-gradient(-90deg, ' +
              scssVars.globalColorGreenStrong +
              ', ' +
              scssVars.globalColorGreenStrong +
              ' ' +
              progress +
              '%, ' +
              scssVars.globalColorYellow +
              ' ' +
              progress +
              '%)',
      };
    },
  },
});
</script>

<style scoped></style>
