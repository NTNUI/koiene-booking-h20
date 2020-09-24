<template>
  <div :style="style">
    <span style="position: relative; top: 30%; left: 10%">{{ availableBeds }} / {{ numberOfBeds }}</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'CabinCapacity',
  props: {
    availableBeds: {
      type: Number,
      default: 0
    },
    numberOfBeds: {
      type: Number,
      default: 0
    }
  },
  computed: {
    style() {
      const progress = Math.floor((this.availableBeds / this.numberOfBeds) * 100);
      return {
        color: progress === 0 ? 'black' : progress >= 99 ? 'white' : 'black',
        width: '90%',
        height: '90%',
        margin: 'auto',
        borderRadius: '50%',
        background:
          progress === 0
            ? 'red'
            : progress >= 99
            ? 'green'
            : 'linear-gradient(90deg, yellow, yellow ' + progress + '%, green ' + progress + '%)'
      };
    }
  }
});
</script>

<style scoped></style>
