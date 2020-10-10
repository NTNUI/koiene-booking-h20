<template>
  <v-row :justify="menuVersion === 'ALL' ? 'center' : menuVersion === 'NEGATIVE' ? 'start' : 'end'">
    <v-btn
      v-for="button in menuButtons"
      :key="button.label"
      :ref="button.label"
      class="navBtn"
      height="50px"
      width="50px"
      @click="button.method"
      >{{ button.label }}</v-btn
    >
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import dayjs from 'dayjs';
import store from '@/store/index';
import { addToDate } from '@/utils/dates';

interface SkipButton {
  label: string;
  method: () => void;
}

type MenuVersions = 'ALL' | 'NEGATIVE' | 'POSITIVE';

export default Vue.extend({
  name: 'DateSkippers',
  props: {
    menuVersion: {
      default: 'ALL',
      type: String,
    },
  },
  computed: {
    startDate() {
      return store.getters['adminBookings/getStartDate'];
    },
    menuButtons(): Array<SkipButton> {
      const buttons: Array<SkipButton> = [
        {
          label: '-1 å',
          method: () => this.skipDates(-1, 'year'),
        },
        {
          label: '-1 m',
          method: () => this.skipDates(-1, 'month'),
        },
        {
          label: '-1 u',
          method: () => this.skipDates(-1, 'week'),
        },
        {
          label: '-1 d',
          method: () => this.skipDates(-1, 'day'),
        },
        {
          label: '+1 d',
          method: () => this.skipDates(+1, 'day'),
        },
        {
          label: '+1 u',
          method: () => this.skipDates(+1, 'week'),
        },
        {
          label: '+1 m',
          method: () => this.skipDates(+1, 'month'),
        },
        {
          label: '+1 å',
          method: () => this.skipDates(+1, 'year'),
        },
      ];
      if (this.menuVersion === 'NEGATIVE') return buttons.slice(0, 4);
      else if (this.menuVersion === 'POSITIVE') return buttons.slice(4);
      else return buttons;
    },
  },
  methods: {
    skipDates(howMany: number, what: dayjs.OpUnitType) {
      const startDate = addToDate(this.startDate, howMany, what);
      store.commit('adminBookings/setStartDate', startDate);
      const endDate = addToDate(startDate, 7, 'day');
      store.dispatch('adminBookings/MOUNT_CABINS_WITH_BOOKINGS', { startDate: startDate, endDate: endDate });
    },
  },
});
</script>

<style scoped></style>
