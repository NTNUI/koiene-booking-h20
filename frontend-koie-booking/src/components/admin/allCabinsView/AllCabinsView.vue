<template>
  <div>
    <h2 style="text-align: center;">Oversikt over bookinger</h2>
    <v-row justify="center">
      <DatePicker />
    </v-row>
    <v-row justify="space-between">
      <v-col>
        <DateSkippers menu-version="NEGATIVE" />
      </v-col>
      <v-col>
        <DateSkippers menu-version="POSITIVE" />
      </v-col>
    </v-row>
    <v-row justify="center">
      <AllCabinsTable />
    </v-row>
  </div>
</template>

<script>
import Vue from 'vue';
import AllCabinsTable from '@/components/admin/allCabinsView/AllCabinsTable';
import DatePicker from '@/components/admin/allCabinsView/DatePicker';
import DateSkippers from '@/components/admin/allCabinsView/DateSkippers';
import dayjs from 'dayjs';
import store from '@/store/index';
import { addToDate } from '@/utils/dates';

export default Vue.extend({
  name: 'AllCabinsView',
  components: { AllCabinsTable, DatePicker, DateSkippers },
  mounted() {
    this.mountCabinsWithBookings();
  },
  methods: {
    mountCabinsWithBookings() {
      const startDate = dayjs().format('YYYY-MM-DD');
      const endDate = addToDate(startDate, 7, 'day');
      store.commit('adminBookings/setStartDate', startDate);
      store.dispatch('adminBookings/MOUNT_CABINS_WITH_BOOKINGS', { startDate: startDate, endDate: endDate });
    },
  },
});
</script>

<style scoped></style>
