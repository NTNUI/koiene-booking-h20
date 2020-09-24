<template>
  <p :style="{ backgroundColor: capacityColor }">{{ occupiedBeds }} / {{ numberOfBeds }}</p>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'CabinCapacity',
  props: {
    numberOfBeds: { type: Number, default: 1 },
    occupiedBeds: { type: Number, default: 0 }
  },
  data() {
    return {
      threshold: 0.3
    };
  },
  computed: {
    capacityColor: function() {
      let allBedsOccupied = this.occupiedBeds === this.numberOfBeds;
      let mostBedsAvailable = this.occupiedBeds / this.numberOfBeds < this.threshold;
      if (allBedsOccupied) {
        return '#ed2712';
      } else if (mostBedsAvailable) {
        return '#00ff5a';
      }
      return '#feeb01';
    }
  }
});
</script>
