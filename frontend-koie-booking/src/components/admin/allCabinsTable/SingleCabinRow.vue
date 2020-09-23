<template>
  <v-row>
    <h4 id="cabin-name">{{ cabinInfo.name }}</h4>

    <h4 :class="{ cabinBedGreen: mondayGreen }">
      {{ cabinInfo.bedsAvailableInDateRange['2020-09-15'] }} / {{ cabinInfo.numberOfBeds }}
    </h4>
    <h4 id="cabin-bed-info">{{ cabinInfo.bedsAvailableInDateRange['2020-09-16'] }} / {{ cabinInfo.numberOfBeds }}</h4>
    <h4 id="cabin-bed-info">{{ cabinInfo.bedsAvailableInDateRange['2020-09-17'] }} / {{ cabinInfo.numberOfBeds }}</h4>
    <h4 id="cabin-bed-info">{{ cabinInfo.bedsAvailableInDateRange['2020-09-18'] }} / {{ cabinInfo.numberOfBeds }}</h4>
    <h4 id="cabin-bed-info">{{ cabinInfo.bedsAvailableInDateRange['2020-09-19'] }} / {{ cabinInfo.numberOfBeds }}</h4>
    <h4 id="cabin-bed-info">{{ cabinInfo.bedsAvailableInDateRange['2020-09-20'] }} / {{ cabinInfo.numberOfBeds }}</h4>
    <h4 id="cabin-bed-info">{{ cabinInfo.bedsAvailableInDateRange['2020-09-21'] }} / {{ cabinInfo.numberOfBeds }}</h4>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import { KoieAdmin } from '@/types/admin';

export default Vue.extend({
  name: 'SingleCabinRow',
  props: {
    cabinInfo: {
      type: Object as () => KoieAdmin,
      default() {
        return {
          name: 'error',
          slug: 'error',
          numberOfBeds: 0,
          bedsAvailableInDateRange: {
            ['2020-01-01']: 0,
            ['2020-01-02']: 0,
            ['2020-01-03']: 0,
            ['2020-01-04']: 0,
            ['2020-01-05']: 0,
            ['2020-01-06']: 0,
            ['2020-01-07']: 0
          }
        };
      }
    }
  },
  data() {
    return {
      cabinBedGreen: 'cabin-bed-green'
    };
  },
  computed: {
    mondayGreen: function() {
      return true;
    }
  }
});
</script>

<style scoped>
#cabin-name {
  padding-right: 5%;
  padding-left: 5%;
}

.cabin-bed {
  margin-left: 3%;
  margin-right: 3%;
}

.cabin-bed-green {
  background-color: green;
}

#cabin-bed-yellow {
  background-color: yellow;
  margin-left: 3%;
  margin-right: 3%;
}

#cabin-bed-red {
  background-color: red;
  margin-left: 3%;
  margin-right: 3%;
}
</style>
