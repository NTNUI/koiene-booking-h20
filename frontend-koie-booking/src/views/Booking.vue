<template>
  <v-container class="global-max-width">
    <v-row>
      <v-col cols="12" sm="8" class="mx-auto" :class="$style.mainColumn">
        <v-stepper v-model="step" alt-labels :class="$style.stepper">
          <v-stepper-header :class="$style.stepperHeader">
            <v-stepper-step :complete="step > 1" :step="1">
              {{ labels[0] }}
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="step > 2" :step="2">
              {{ labels[1] }}
            </v-stepper-step>
            <v-divider></v-divider
            ><v-stepper-step :complete="step > 3" :step="3">
              {{ labels[2] }}
            </v-stepper-step>
            <v-divider></v-divider
            ><v-stepper-step :step="4">
              {{ labels[3] }}
            </v-stepper-step>
          </v-stepper-header>
          <v-layout>
            <LoadingSpinner v-if="isLoading" />
            <BookingFirstStep v-else-if="step === 1" />
            <BookingSecondStep v-else-if="step === 2" />
            <BookingThirdStep v-else-if="step === 3" />
            <BookingFourthStep v-else-if="step === 4" />
          </v-layout>
        </v-stepper>
        <div v-show="!apiError" :class="$style.btnWrapper">
          <v-btn
            v-if="step > 1 && step < 4"
            :color="this.$scssVars.globalColorPrimary"
            raised="true"
            :dark="true"
            data-test="btnPrev"
            @click="prevStep"
            >{{ $t('booking.back_button') }}</v-btn
          >
          <v-btn
            v-if="step < 3"
            :disabled="!checkValid || disableBooking"
            :color="this.$scssVars.globalColorPrimary"
            :class="$style.nextStepButton"
            raised="true"
            :dark="true"
            data-test="btnNext"
            @click="nextStep"
            >{{ $t('booking.next_button') }}</v-btn
          >
          <v-btn
            v-if="step === 4"
            :color="this.$scssVars.globalColorPrimary"
            :class="$style.nextStepButton"
            raised="true"
            :dark="true"
            data-test="btnNext"
            @click="done"
            >{{ $t('booking.done_button') }}</v-btn
          >
          <v-alert
            v-if="disableBooking"
            v-model="disableBooking"
            transition="expand-transition"
            :class="$style.errorMsg"
            type="info"
            @click="error = false"
          >
            {{ $t('avalanche.error_msg') }}
          </v-alert>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import BookingFirstStep from '../components/BookingFirstStep.vue';
import BookingSecondStep from '../components/BookingSecondStep.vue';
import BookingThirdStep from '../components/BookingThirdStep.vue';
import BookingFourthStep from '../components/BookingFourthStep.vue';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import { BookingData } from '../types/booking';
import Vue from 'vue';
export default Vue.extend({
  name: 'Booking',
  components: {
    BookingFirstStep,
    BookingSecondStep,
    BookingThirdStep,
    BookingFourthStep,
    LoadingSpinner
  },

  data(): BookingData {
    return {
      step: 1,
      labels: [
        this.$i18n.t('booking.step1'),
        this.$i18n.t('booking.step2'),
        this.$i18n.t('booking.step3'),
        this.$i18n.t('booking.step4')
      ]
    };
  },
  computed: {
    dateFrom(): string {
      return this.$store.state.booking.dateFrom;
    },
    dateTo(): string {
      return this.$store.state.booking.dateTo;
    },
    error(): boolean {
      return this.$store.state.koie.error;
    },
    createBookingError(): boolean {
      return this.$store.state.booking.error;
    },
    isLoading(): boolean {
      return this.$store.state.booking.isLoading;
    },
    checkValid(): string {
      return this.$store.state.booking.validForm;
    },
    koieTitle(): string {
      return this.$store.state.koie.koieData.name || this.$route.params.id;
    },
    disableBooking(): boolean {
      return this.$store.state.avalanche.disableBooking;
    },
    apiError(): boolean {
      return this.$store.state.koie.error;
    },
    bookingStep(): boolean {
      return this.$store.state.booking.step;
    }
  },
  watch: {
    dateFrom: function() {
      this.fetchWarningData();
    },
    dateTo: function() {
      this.fetchWarningData();
    },
    apiError(): boolean {
      return this.$store.state.koie.error;
    },
    bookingStep: function() {
      this.step = this.$store.state.booking.step;
      if (this.$store.state.booking.step === 1) {
        this.resetBookingInfo();
      }
    }
  },
  mounted() {
    //resetting everything when component mounts
    this.$store.dispatch('booking/SET_STEP', 1);
    this.step = 1;
    this.$store.dispatch('booking/SET_VALID_FORM', true);
    this.resetBookingInfo();
    this.$store.dispatch('booking/SET_EDITED', false);
  },
  methods: {
    async fetchWarningData() {
      if (this.$store.state.avalanche.koierToCheck.includes(this.koieTitle)) {
        const values = {
          latitude: this.$store.state.koie.koieData.latitude,
          longitude: this.$store.state.koie.koieData.longitude,
          language: 2,
          dateFrom: this.$store.state.booking.dateFrom,
          dateTo: this.$store.state.booking.dateTo
        };
        await this.$store.dispatch('avalanche/FETCH_AVALANCHE_LEVELS', values);
        const warningData = await this.$store.state.avalanche.warningData;
        for (let e in warningData) {
          if (warningData[e].warningLevel > 2) {
            this.$store.dispatch('avalanche/DISABLE_BOOKING', true);
            return;
          } else {
            this.$store.dispatch('avalanche/DISABLE_BOOKING', false);
          }
        }
      }
    },
    async resetBookingInfo() {
      const guests = [{ name: '', number: '', email: '', isMember: true }];
      for (let i = 0; i < Number(this.$store.state.booking.beds) - 1; i++) {
        guests.push({ name: '', number: '', email: '', isMember: true });
        this.$store.dispatch('booking/SET_GUESTS', guests);
      }

      if (this.$store.state.koie.koieData.name.length === 0) {
        await this.$store.dispatch('koie/FETCH_DATA', this.koieTitle);
      }
      this.fetchWarningData();
      this.$store.dispatch('booking/SET_GUESTS', [{ name: '', number: '', email: '', isMember: true }]);
    },
    async nextStep() {
      if (this.step === 2) {
        const values = {
          koie: await this.$store.state.koie.koieData.name.toLowerCase(),
          arrival_date: await this.$store.state.booking.dateFrom,
          departure_date: await this.$store.state.booking.dateTo,
          guests_member: await this.$store.state.booking.numberOfMembers,
          guests_not_member: await this.$store.state.booking.numberOfNonMembers
        };
        this.$store.dispatch('booking/CREATE_BOOKING', values);
      }
      if (this.step === 2 && this.createBookingError) {
        this.step = 1;
        this.$store.dispatch('booking/SET_STEP', Number(this.$store.state.booking.step) + 1);
      } else {
        this.step < 4 && this.$store.dispatch('booking/SET_STEP', Number(this.$store.state.booking.step) + 1);
        this.step = Number(this.$store.state.booking.step);
      }
    },
    prevStep() {
      this.step >= 1 && this.$store.dispatch('booking/SET_STEP', Number(this.$store.state.booking.step) - 1);
      this.step = Number(this.$store.state.booking.step);
      if (this.step === 1) {
        this.$store.dispatch('booking/SET_VALID_FORM', true);
      }
    },
    firstStep() {
      this.$store.dispatch('booking/SET_STEP', 1);
      this.step = 1;
    },
    done() {
      this.$router.push(`/`);
    }
  }
});
</script>

<style lang="scss" module>
.mainColumn {
  @media only screen and (max-width: 600px) {
    padding-left: 0px;
    padding-right: 0px;
  }
}

.stepper {
  min-height: 80vh;
  box-shadow: none;
  background: none !important;
  @media only screen and (min-width: 1500px) {
    min-height: 60vh;
  }
}
.stepperHeader {
  box-shadow: none;
}

.btnWrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 5%;
}
.nextStepButton {
  margin-left: 20px;
}
.errorMsg {
  margin: 10px 16px 10px 16px;
}
</style>
