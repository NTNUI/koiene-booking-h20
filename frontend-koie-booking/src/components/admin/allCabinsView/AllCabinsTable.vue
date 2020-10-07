<template>
  <v-data-table
    style="width: 100%"
    :headers="headers"
    :items="allCabinsWithBookings"
    :items-per-page="24"
    :hide-default-footer="true"
    :custom-sort="customSort"
    loading-text="Henter inn bookinger"
    no-data-text="Det skjedde noe feil da vi prøvde å hente bookinger"
  >
    <template slot="item" slot-scope="row">
      <tr>
        <td>
          {{ row.item.name }}
        </td>
        <td v-for="(header, index) in dateHeaders" :key="index + row.item.slug" style="width: 12vw">
          <div style="width: 60px; height: 60px; margin: auto">
            <CabinCapacity
              :available-beds="Object.values(row.item.bedsAvailableInDateRange)[index]"
              :number-of-beds="row.item.numberOfBeds"
            />
          </div>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import Vue from 'vue';
import AdminBooking from '@/types/admin/AdminBooking';
import store from '@/store/index';
import { addToDate, formatDate } from '@/utils/dates';
import CabinCapacity from '@/components/admin/allCabinsView/CabinCapacity.vue';
import getKoieData from '../../../../tests/unit/__mocks__/koiene';

interface Header {
  text: string;
  align: string;
  sortable: boolean;
  value: string;
}

export default Vue.extend({
  name: 'AllCabinsTable',
  components: { CabinCapacity },
  computed: {
    allCabinsWithBookings(): Array<AdminBooking> {
      return this.$store.getters['adminBookings/getCabinsWithBookingsArray'];
    },
    dateHeaders(): Array<Header> {
      return this.headers.slice(1);
    },
    headers(): Array<Header> {
      const startDate = this.$store.getters['adminBookings/getStartDate'];
      const res: Array<Header> = [
        {
          text: 'Navn',
          sortable: true,
          value: 'name',
          align: 'start',
        },
        {
          text: startDate + '\n (' + formatDate(startDate, 'dddd') + ')',
          sortable: true,
          value: startDate,
          align: 'center',
        },
      ];
      for (let i = 1; i < 7; i++) {
        const date = addToDate(startDate, i, 'day');
        const header: Header = {
          text: date + '\n (' + formatDate(date, 'dddd') + ')',
          sortable: true,
          value: date,
          align: 'center',
        };
        res.push(header);
      }
      return res;
    },
  },
  methods: {
    customSort(items: Array<AdminBooking>, index: Array<string>, isDesc: Array<boolean>) {
      return items.sort((a, b) => {
        if (index[0] === 'name') {
          if (isDesc[0]) {
            return a.slug.localeCompare(b.slug);
          } else {
            return b.slug.localeCompare(a.slug);
          }
        } else if (index[0] && index[0].length) {
          const bedsAvailableInA = a.bedsAvailableInDateRange[index[0]];
          const bedsAvailableInB = b.bedsAvailableInDateRange[index[0]];
          if (isDesc[0]) {
            return bedsAvailableInA > bedsAvailableInB ? 1 : bedsAvailableInA < bedsAvailableInB ? -1 : 0;
          } else {
            return bedsAvailableInA > bedsAvailableInB ? -1 : bedsAvailableInA < bedsAvailableInB ? 1 : 0;
          }
        }
        return 0;
      });
    },
  },
});
</script>

<style scoped></style>
