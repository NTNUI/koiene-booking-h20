<template>
  <v-container :class="row ? $style.row : $style.column" v-bind="$props">
    <v-menu
      ref="menu1"
      v-model="menu1"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="290px"
      dark
    >
      <template v-slot:activator="{ on }" :class="$style.templateTextField">
        <v-text-field
          v-model="computedDateFormattedFrom"
          :label="$t('calendar.arrival')"
          prepend-icon="event"
          dark
          :disabled="noDatesAvailable"
          :class="row && $style.rowTextFieldArrival"
          @blur="dateFrom = parseDate(dateFormatted(temporaryDateFrom))"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="dateFrom"
        :min="minimumDate"
        :max="maximumDate"
        :color="this.$scssVars.globalColorPrimary"
        :allowed-dates="allowedDatesFrom"
        no-title
        @input="menu1 = false"
        @change="updateDisabledDatesInMenu"
      ></v-date-picker>
    </v-menu>
    <v-menu
      ref="menu2"
      v-model="menu2"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="290px"
      dark
    >
      <template v-slot:activator="{ on }" :class="$style.templateTextField">
        <v-text-field
          v-model="computedDateFormattedTo"
          :label="$t('calendar.departure')"
          prepend-icon="event"
          :disabled="noDatesAvailable"
          dark
          :class="[row ? $style.rowTextFieldDeparture : '', row && !allkoier ? $style.bookingTabletRemovePadding : '']"
          @blur="
            {
              dateTo = parseDate(dateFormatted(temporaryDateTo));
              updatedDateFrom = !updatedDateFrom;
            }
          "
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="dateTo"
        :min="minimumDateTo"
        :max="maximumDateTo"
        no-title
        :color="this.$scssVars.globalColorPrimary"
        @input="menu2 = false"
        @change="updateDisabledDatesInMenu"
      ></v-date-picker>
    </v-menu>
    <div :class="$style.divBeds">
      <p v-if="vbeds" :class="$style.bedsText" v-bind="$props">
        {{ $t('calendar.beds') }}
      </p>
      <p v-if="!row" :class="$style.availableBedsText">( {{ availableBeds }} available )</p>
      <v-text-field
        v-if="vbeds"
        v-model="beds"
        :value="beds"
        :class="$style.bedsInput"
        v-bind="$props"
        min="1"
        :max="availableBeds"
        :disabled="noDatesAvailable"
        :dense="true"
        dark
        hide-details
        single-line
        outlined
        type="number"
        @change="(e) => setBeds(e)"
      />
    </div>
    <v-alert
      v-if="error"
      v-model="error"
      transition="expand-transition"
      :dismissible="true"
      :class="$style.errorMsg"
      type="info"
      @click="error = false"
    >
      {{ $t('calendar.errormsg') }} {{ availableBeds }}
    </v-alert>
  </v-container>
</template>

<script lang="ts">
import { CalendarData } from '../types/calendar';
import Vue from 'vue';
import { getDateString, getDate } from '@/utils/dates';

export default Vue.extend({
  name: 'Calendar',
  props: {
    row: { type: Boolean, default: true },
    vbeds: { type: Boolean, default: true },
    allkoier: { type: Boolean, default: false }
  },
  data(): CalendarData {
    return {
      menu1: false,
      menu2: false,
      beds: this.$store.state.booking.beds,
      disabledDates: [],
      minimumDate: getDateString(),
      maximumDate: getDateString(),
      maximumDateTo: getDateString(),
      error: false,
      updatedDateFrom: false,
      temporaryDateTo: this.$store.state.booking.dateTo || getDateString(undefined, 1),
      temporaryDateFrom: this.$store.state.booking.dateFrom || getDateString(),
      setDatesFinished: false
    };
  },
  computed: {
    computedDateFormattedFrom(): string | null {
      return this.formatDate(this.dateFrom);
    },
    computedDateFormattedTo(): string | null {
      return this.formatDate(this.dateTo);
    },
    minimumDateTo(): string {
      return getDateString(this.dateFrom, 1);
    },
    daysInAdvanceBooking(): number {
      return this.$store.state.koie.koieData.booking_window || 14;
    },
    availableBeds(): number {
      if (this.allkoier) {
        this.$store.dispatch('booking/SET_AVAILABLE_BEDS', 25);
      }
      if (this.$store.state.booking.availableBeds != undefined) {
        return this.$store.state.booking.availableBeds;
      }
      return 10;
    },
    totalBeds(): number {
      return this.$store.state.koie.koieData.number_of_beds;
    },
    warningLevels(): Array<any> {
      return this.$store.state.avalanche.warningLevels;
    },
    noDatesAvailable(): boolean {
      return this.$store.state.booking.noDatesAvailable;
    },
    koieTitle(): string {
      return this.$store.state.koie.koieData.name;
    },
    dateFrom: {
      get(): string {
        return this.temporaryDateFrom;
      },
      set(newValue: string) {
        if (newValue === '--------') {
          newValue = this.dateFrom;
        }
        this.temporaryDateFrom = newValue;
        if (getDate(this.temporaryDateTo) <= getDate(this.dateFrom)) {
          this.dateTo = getDateString(newValue, 1);
        }
        if (this.setDatesFinished) {
          this.updateDisabledDatesInMenu();
          this.$store.dispatch('booking/SET_DATE_FROM', this.dateFrom);
          this.getAvailableBeds();
          this.setBeds(this.beds.toString());
        }
      }
    },

    dateTo: {
      get(): string {
        return this.temporaryDateTo;
      },
      set(newValue: string) {
        this.temporaryDateTo = newValue;
        if (this.setDatesFinished) {
          this.updateDisabledDatesInMenu();
          this.$store.dispatch('booking/SET_DATE_TO', this.temporaryDateTo);
          this.getAvailableBeds();
          //setting beds here makes sure that if you choose a date where only 9 beds is available and you have already chosen 10 beds, then beds is reset to 1
          this.setBeds(this.beds.toString());
        }
      }
    }
  },
  mounted() {
    this.maximumDate = getDateString(undefined, this.daysInAdvanceBooking - 1);
    this.maximumDateTo = getDateString(undefined, this.daysInAdvanceBooking);
    this.minimumDate = getDateString();

    this.setDates();
    this.updateDisabledDatesInMenu();
    //checks if we are on AllKoier.vue, there's no maximumBeds since we look at all the cabins
    if (this.$props.allkoier === false) {
      this.getAvailableBeds();
    }
    if (this.$store.state.booking.beds <= this.availableBeds) {
      this.beds = this.$store.state.booking.beds;
    }
    if (this.$store.state.booking.dateFrom.length === 0) {
      //if the dates are not sat, we set the date in store to be todays date so it won't be undefined
      this.$store.dispatch('booking/SET_DATE_FROM', this.dateFrom);
      this.$store.dispatch('booking/SET_DATE_TO', this.dateTo);
    }
  },
  methods: {
    disableBooking() {
      if (this.$store.state.avalanche.koierToCheck.includes(this.koieTitle)) {
        for (let e in this.warningLevels) {
          if (this.warningLevels[e].level > 2) {
            this.$store.dispatch('avalanche/DISABLE_BOOKING', true);
            return;
          } else {
            this.$store.dispatch('avalanche/DISABLE_BOOKING', false);
          }
        }
      }
    },
    formatDate(date: string): string | null {
      if (!date) return null;
      const [year, month, day] = date.split('-');
      let dateString: string = '';
      if (this.noDatesAvailable) {
        dateString = '--/--/--';
      } else {
        dateString = `${month}/${day}/${year}`;
      }
      return dateString;
    },
    parseDate(date: string | null): string | null {
      if (date === '--------' || date === '--/--/--') {
        date = this.formatDate(this.dateFrom);
      }
      if (!date) return null;
      let parsedDate = '';
      if (date.includes('/')) {
        const [month, day, year] = date.split('/');
        parsedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      } else {
        parsedDate = date;
      }
      return parsedDate;
    },
    setBeds(number: string) {
      if (parseInt(number) <= this.availableBeds) {
        this.$store.dispatch('booking/SET_BEDS', number);
        this.checkNoDatesAvailable();
      } else {
        this.error = true;
        this.beds = 1;
        this.$store.dispatch('booking/SET_BEDS', 1);
      }
    },
    allowedDatesFrom(val: string): string {
      let allowedDate: string = '';
      if (!this.disabledDates.includes(val)) {
        allowedDate = val;
      }
      return allowedDate;
    },
    dateFormatted(date: string): string | null {
      if (date === '--/--/--' || date === '--------') {
        date = this.dateFrom;
      }
      return getDateString(date);
    },
    async getAvailableBeds() {
      const bedsAvailableBetweenDates: number[] = this.bedsAvailableBetweenDates(this.dateFrom, this.dateTo);
      const available = Math.min.apply(null, bedsAvailableBetweenDates);
      this.checkNoDatesAvailable(available);
      if (available) {
        await this.$store.dispatch('booking/SET_AVAILABLE_BEDS', available);
      }
    },
    //find available beds per day, between two dates at a given cabin. Also update disabledDates list.
    bedsAvailableBetweenDates(dateFrom: string, dateTo: string): number[] {
      try {
        const listOfDates = [];
        listOfDates.push(dateFrom);
        let tempDate = dateFrom;
        //add all the dates between fromdate and todate to a list
        const dateToMinus1 = getDate(dateTo, -1);
        while (getDate(tempDate) < dateToMinus1) {
          tempDate = getDateString(tempDate, +1);
          listOfDates.push(tempDate);
        }
        const bedsAvailablePerDate = listOfDates.map((date) => {
          if (
            this.$store.state.koie.koieData.beds_available_in_booking_window[date] < 1 ||
            this.$store.state.koie.koieData.beds_available_in_booking_window[date] < this.beds
          ) {
            this.disabledDates.push(date);
          } else {
            //if we change something so that the date should be possible to choose, we have to remove it from disableddates array
            if (this.disabledDates.includes(date)) {
              const index = this.disabledDates.indexOf(date);
              if (index > -1) {
                this.disabledDates.splice(index, 1);
              }
            }
          }
          return this.$store.state.koie.koieData.beds_available_in_booking_window[date];
        });
        return bedsAvailablePerDate;
      } catch (err) {
        if (process.env.NODE_ENV !== 'test') {
          throw err.message;
        }
        return [];
      }
    },
    setDates() {
      /*checks if todays date is in the disabled dates, in that case, sets dateFrom to be the next date, then
      checks that date as well. If the dateFrom gets set to the date after maximumDate, it means all bookable dates are unavailable.
      */
      // Initialize disabledDatesList
      this.bedsAvailableBetweenDates(this.minimumDate, this.maximumDate);

      this.dateFrom = this.$store.state.booking.dateFrom || getDateString();

      // If the store dateFrom is initially beyond the booking window of this koie, reset the dates.
      const resetDateTo = this.checkDatesBeyondBookingWindow();

      let dateFromUpdated = false;
      if (this.disabledDates.includes(this.dateFrom) || this.maximumDate === this.dateFrom) {
        this.setDatesFinished = false;
        dateFromUpdated = true;
        while (this.disabledDates.includes(this.dateFrom)) {
          this.dateFrom = getDateString(this.dateFrom, 1);
          if (this.dateFrom === this.maximumDate) {
            break;
          }
        }
      }

      this.checkNoDatesAvailable();
      this.setDatesFinished = true;
      // To trigger the dateFrom.set function
      this.dateFrom = this.dateFrom;

      // If dateFrom has been updated because of unavailability or store value is empty, then temporaryDateTo = temporaryDateFrom + 1
      if (dateFromUpdated || resetDateTo || !this.$store.state.booking.dateTo) {
        this.dateTo = getDateString(this.dateFrom, 1);
      } else {
        this.dateTo = this.$store.state.booking.dateTo;
      }
    },
    checkNoDatesAvailable(available = 5) {
      if (!this.allkoier && (getDate(this.dateFrom) > getDate(this.maximumDate) || available < 1)) {
        this.$store.dispatch('booking/SET_NO_DATES_AVAILABLE', true);
        this.$store.dispatch('avalanche/DISABLE_BOOKING', true);
        this.beds = 0;
        this.$store.dispatch('booking/SET_BEDS', 0);
        this.$store.dispatch('booking/SET_AVAILABLE_BEDS', 0);
      } else {
        this.$store.dispatch('booking/SET_NO_DATES_AVAILABLE', false);
        //this.$store.dispatch('avalanche/DISABLE_BOOKING', false);
      }
    },
    updateDisabledDatesInMenu() {
      this.maximumDateTo = getDateString(undefined, this.daysInAdvanceBooking);
      for (let e in this.disabledDates) {
        const day = getDate(this.disabledDates[e].toString());
        // if a disabled date is after the dateFrom that is chosen
        if (day > getDate(this.dateFrom)) {
          // if the disabled date is smaller than what we already have as maxiumumDateTo
          if (day < getDate(this.maximumDateTo)) {
            this.maximumDateTo = day.toISOString().substr(0, 10);
          }
          // handles edge case where a dateFrom is chosen before a disabled date, when dateTo already was after the disabled date
          if (getDate(this.dateTo) > getDate(this.maximumDateTo)) {
            this.dateTo = getDateString(this.dateFrom, 1);
          }
        }
      }
    },
    checkDatesBeyondBookingWindow(): boolean {
      if (getDate(this.dateFrom) > getDate(this.maximumDate)) {
        this.dateFrom = getDateString();
        return true;
      }
      return false;
    }
  }
});
</script>

<style lang="scss" module>
.row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-top: 12px;
  margin: auto;
  @media only screen and (max-width: 960px) {
    justify-content: space-between;
  }
}

// Every element in the filter menu
.row > div,
v-menu {
  padding-left: 12px;
  padding-right: 12px;
  @media only screen and (max-width: 600px) {
    padding-left: 0;
    padding-right: 0;
  }
}

.bookingTabletRemovePadding {
  @media only screen and (min-width: 600px) and (max-width: 960px) {
    padding-left: 0 !important;
  }
}

.row > div:last-child {
  padding-right: 0;
}

.rowTextFieldArrival {
  max-width: 200px;
  padding-left: 0 !important;
  @media only screen and (max-width: 600px) {
    max-width: 150px;
    margin-right: 0;
  }
}
.rowTextFieldDeparture {
  max-width: 200px;
  @media only screen and (max-width: 600px) {
    max-width: 150px;
  }
}
.bedsText {
  margin-bottom: 0 !important;
}
.availableBedsText {
  margin-bottom: 0 !important;
  font-weight: 100;
  @media only screen and (min-width: 600px) and (max-width: 960px) {
    font-size: 8px;
  }
}

.divBeds {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.bedsInput {
  max-width: 60px;
  margin-left: 8px !important;
  margin-bottom: 0;
}

.column {
  display: flex;
  flex-direction: column;
}

.templateTextField {
  display: flex;
  flex-direction: column;
  margin: 6%;
}
.errorMsg {
  margin-top: 10px;
}
</style>
