<template>
  <v-data-table
    style="width: 100%"
    :headers="headers"
    :items="allCabinsWithBookings"
    :items-per-page="24"
    :hide-default-footer="true"
    loading-text="Henter inn bookinger"
    no-data-text="Det skjedde noe feil da vi prøvde å hente bookinger"
  >
    <template slot="item" slot-scope="row">
      <tr>
        <td v-for="(header, index) in headers" :key="index + row.item.slug">
          <span v-if="index === 0">
            {{ row.item.name }}
          </span>
          <div v-else style="width: 60px; height: 60px; margin: auto">
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
      return store.getters['adminBookings/getCabinsWithBookingsArray'];
    },
    headers(): Array<Header> {
      const startDate = store.getters['adminBookings/getStartDate'];
      const res: Array<Header> = [
        {
          text: 'Navn',
          sortable: true,
          value: 'name',
          align: 'start'
        },
        {
          text: startDate + '\n (' + formatDate(startDate, 'dddd') + ')',
          sortable: true,
          value: 'date' + 0,
          align: 'center'
        }
      ];
      for (let i = 1; i < 7; i++) {
        const date = addToDate(startDate, i, 'day');
        const header: Header = {
          text: date + '\n (' + formatDate(date, 'dddd') + ')',
          sortable: true,
          value: 'date' + i,
          align: 'center'
        };
        res.push(header);
      }
      return res;
    }
  }
});
</script>

<style scoped></style>
