<template>
  <v-row justify="center">
    <v-col>
      <!-- Calendar selection -->
      <v-row justify="center">
        <v-col cols="2">
          <v-menu
            :close-on-content-click="true"
            :nudge-right="20"
            :nudgeTop="20"
            :first-day-of-week="1"
            transition="scale-transition"
            offset-y
            min-width="290px"
            no-title
            close-on-change
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date1"
                label="Select starting date"
                prepend-icon="event"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date1" @input="selectDate"></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
      <!-- Date selction menu bar -->
      <v-row>
        <!-- Buttons for back in time -->
        <v-col cols="2">
          <v-row justify="space-around">
            <v-btn class="navBtn" height="50px" width="23%" @click="date1 = addToDate(-1, 'year')">
              -1 y
            </v-btn>
            <v-btn class="navBtn" height="50px" width="23%" @click="date1 = addToDate(-1, 'month')">
              -1 m
            </v-btn>
            <v-btn class="navBtn" height="50px" width="23%" @click="date1 = addToDate(-1, 'week')">
              -1 w
            </v-btn>
            <v-btn class="navBtn" height="50px" width="23%" @click="date1 = addToDate(-1, 'day')">
              -1 d
            </v-btn>
          </v-row>
        </v-col>
        <!-- Show dates and day of week here -->
        <v-col v-for="d in 7" :key="d" class="px-1">
          <v-card class="py-0" outlined tile>
            {{ formatDate(addToDate(d - 1, 'day'), 'dddd') }}
            <br />
            {{ addToDate(d - 1, 'day') }}
          </v-card>
        </v-col>
        <!-- Buttons for forward in time -->
        <v-col cols="2">
          <v-row justify="space-around">
            <v-btn class="navBtn" height="50px" width="23%" @click="date1 = addToDate(1, 'day')">
              +1 d
            </v-btn>
            <v-btn class="navBtn" height="50px" width="23%" @click="date1 = addToDate(1, 'week')">
              +1 w
            </v-btn>
            <v-btn class="navBtn" height="50px" width="23%" @click="date1 = addToDate(1, 'month')">
              +1 m
            </v-btn>
            <v-btn class="navBtn" height="50px" width="23%" @click="date1 = addToDate(1, 'year')">
              +1 y
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import * as dayjs from 'dayjs';
dayjs().format();
import store from '@/store/index';

export default Vue.extend({
  name: 'AllCabinsTable',

  data() {
    return {
      date1: dayjs().format('YYYY-MM-DD')
    };
  },

  methods: {
    selectDate(date: string): void {
      console.log('Updated date through date picker to ' + date);
    },
    addToDate(howMany: number, what: dayjs.OpUnitType): string {
      let date: dayjs.Dayjs = dayjs(this.date1 + 'T00:00:00.000Z');
      return date.add(howMany, what).format('YYYY-MM-DD');
    },
    formatDate(dateISO: string, formatString: string): string {
      let date: dayjs.Dayjs = dayjs(dateISO + 'T00:00:00.000Z');
      return date.format(formatString);
    }
  },

  mounted() {
    store.dispatch('adminBookings/MOUNT_CABINS_WITH_BOOKINGS', { startDate: '2020-09-23', endDate: '2020-09-30' });
  }
});
</script>

<style lang="scss" scoped></style>
