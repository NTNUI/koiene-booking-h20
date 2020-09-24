<template>
  <v-row>
    <v-col>
      <h4 id="cabin-name">{{ cabinInfo.name }}</h4>
    </v-col>
    <v-col v-for="bookingInfo in cabinInfo.bedsAvailableInDateRange" :key="bookingInfo">
      <CabinCapacity :number-of-beds="cabinInfo.numberOfBeds" :occupied-beds="bookingInfo" />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import CabinCapacity from '@/components/admin/allCabinsTable/CabinCapacity.vue';
import { KoieAdmin } from '@/types/admin';

export default Vue.extend({
  name: 'SingleCabinRow',
  components: { CabinCapacity },
  props: {
    cabinInfo: {
      type: Object as () => KoieAdmin,
      default() {
        return {
          name: 'error',
          slug: 'error',
          numberOfBeds: 1,
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
  }
});
</script>

<style scoped>
/** TODO: Set cabin-name column width in a smarter, more responsive way */
#cabin-name {
  width: 200px;
}
</style>
