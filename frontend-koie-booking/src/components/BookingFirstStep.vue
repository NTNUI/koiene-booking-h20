<template>
  <ErrorCard v-if="apiError" />
  <LoadingSpinner v-else-if="isLoading" />
  <v-layout v-else :class="$style.container" :dark="true">
    <h1 :class="$style.heading">{{ $t('booking.reservation') }} {{ koieTitle }}</h1>
    <v-layout :class="$style.separator">
      <h3>{{ $t('booking.dates') }}</h3>
      <v-layout class="px-1">
        <Calendar :vbeds="false" :row="true" />
      </v-layout>
    </v-layout>
    <v-layout :class="$style.separator">
      <h3>{{ $t('booking.bed_reservation') }}</h3>
      <v-layout :class="$style.availableBeds">
        <v-icon :class="$style.icon" v-text="'mdi-bed'"></v-icon>
        <p :class="$style.availableBedsText">
          {{ bedsAvailable }} / {{ bedsTotal }} {{ $t('booking.available_beds') }}
        </p>
      </v-layout>
      <v-layout :class="$style.chooseBeds">
        <p style="margin-bottom: 0" :class="$style.chooseText">{{ $t('booking.choose_numbers') }}</p>
        <v-text-field
          v-model="bedsChosen"
          :value="bedsChosen"
          :class="$style.bedPicker"
          min="1"
          :max="bedsAvailable"
          :dense="true"
          hide-details
          single-line
          outlined
          type="number"
          @change="(e) => setBeds(e)"
        />
      </v-layout>
      <v-alert
        v-if="error"
        v-model="error"
        transition="expand-transition"
        :dismissible="true"
        :class="$style.errorMsg"
        type="info"
        @click="error = false"
      >
        {{ $t('calendar.errormsg') }} {{ bedsAvailable }}
      </v-alert>
    </v-layout>
  </v-layout>
</template>

<script lang="ts">
import Calendar from '../components/Calendar.vue';
import ErrorCard from '../components/ErrorCard.vue';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import Vue from 'vue';
import { BookingFirstStepData } from '../types/booking';
import BookingSecondStepVue from './BookingSecondStep.vue';

export default Vue.extend({
  name: 'BookingFirstStepVue',
  components: {
    Calendar,
    ErrorCard,
    LoadingSpinner
  },
  data(): BookingFirstStepData {
    return {
      bedsTotal: 8,
      bedsChosen: 1,
      error: false
    };
  },
  computed: {
    koieTitle(): string {
      return this.$store.state.koie.koieData.name || this.$route.params.id;
    },
    apiError(): boolean {
      return this.$store.state.koie.error;
    },
    isLoading(): boolean {
      return this.$store.state.koie.isLoading;
    },
    bedsAvailable(): number {
      return this.$store.state.booking.availableBeds;
    }
  },
  created() {
    this.getTotalBeds();
    if (this.$store.state.booking.beds <= this.bedsAvailable) {
      this.bedsChosen = this.$store.state.booking.beds;
    }
  },
  methods: {
    setBeds(number: number) {
      if (this.$store.state.booking.edited) {
        this.$store.dispatch('booking/SET_EDITED', false);
      }
      if (number <= this.bedsAvailable) {
        this.$store.dispatch('booking/SET_BEDS', number);
      } else {
        this.bedsChosen = 1;
        this.$store.dispatch('booking/SET_BEDS', 1);
        this.error = true;
      }
    },
    goToNextStep() {
      this.$store.dispatch('SET_STEP', 2);
    },
    async getTotalBeds() {
      if (this.$store.state.koie.koieData.name.toLowerCase() !== this.koieTitle.toLowerCase()) {
        await this.$store.dispatch('koie/FETCH_DATA', this.koieTitle.toLowerCase());
      }
      this.bedsTotal = await this.$store.state.koie.koieData.number_of_beds;
    }
  }
});
</script>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: column;
}
.heading {
  margin-top: 20px;
  align-self: center;
}
.separator {
  border-left: solid 4px;
  border-color: #2f3a50;
  display: flex;
  flex-direction: column;
  margin-top: 24px;
}

.separator > h3 {
  padding: 16px;
}
.icon {
  margin-right: 8px;
  margin-bottom: 6px;
}
.availableBeds {
  display: flex;
  flex-direction: row;
  padding-left: 16px;
  padding-right: 16px;
}
.availableBedsText {
  margin-top: 10px;
}
.chooseBeds {
  display: flex;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
}
.chooseText {
  margin-right: 20px;
}
.bedPicker {
  max-width: 60px;
  margin-left: 20px;
}
.errorMsg {
  margin-top: 10px;
}
</style>
