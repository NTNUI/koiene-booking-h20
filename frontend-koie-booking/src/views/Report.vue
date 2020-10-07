<template>
  <v-container class="global-max-width">
    <v-row>
      <v-col cols="12" sm="8" class="mx-auto" :class="$style.mainColumn">
        <v-stepper v-model="step" alt-labels :class="$style.stepper">
          <v-stepper-header :class="$style.stepperHeader">
            <v-stepper-step :complete="step > 1" :step="1">
              {{ $t('report.step1') }}
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="step > 2" :step="2">
              {{ $t('report.step2') }}
            </v-stepper-step>
            <v-divider></v-divider
            ><v-stepper-step :complete="step > 3" :step="3">
              {{ $t('report.step3') }}
            </v-stepper-step>
            <v-divider></v-divider
            ><v-stepper-step :complete="step > 4" :step="4">
              {{ $t('report.step4') }}
            </v-stepper-step>
          </v-stepper-header>
          <v-layout>
            <ErrorCard v-if="apiError" />
            <LoadingSpinner v-else-if="isLoading" />
            <FirstStep v-else-if="step === 1" />
            <SecondStep v-else-if="step === 2" />
            <ThirdStep v-else-if="step === 3" />
            <FourthStep v-else-if="step === 4" />
            <ThankYouStep v-else-if="step === 5" />
          </v-layout>
        </v-stepper>
        <div v-show="!isLoading && step < 5" :class="$style.btnWrapper">
          <v-btn
            v-if="step > 1"
            :color="this.$scssVars.globalColorPrimary"
            raised="true"
            :dark="true"
            data-test="btnPrev"
            @click="prevStep(step)"
            >{{ $t('report.back_button') }}</v-btn
          >
          <v-btn
            v-if="step < steps"
            :disabled="!isValid"
            :color="this.$scssVars.globalColorPrimary"
            :class="$style.nextStepButton"
            raised="true"
            :dark="true"
            data-test="btnNext"
            @click="nextStep(step)"
            >{{ $t('report.next_button') }}</v-btn
          >
          <v-btn
            v-if="step === steps"
            :color="this.$scssVars.globalColorPrimary"
            :class="$style.nextStepButton"
            raised="true"
            :dark="true"
            data-test="btnNext"
            @click="done"
            >{{ $t('report.done_button') }}</v-btn
          >
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import ErrorCard from '@/components/ErrorCard.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import FirstStep from '@/components/report/FirstStep.vue';
import SecondStep from '@/components/report/SecondStep.vue';
import ThirdStep from '@/components/report/ThirdStep.vue';
import FourthStep from '@/components/report/FourthStep.vue';
import ThankYouStep from '@/components/report/ThankYouStep.vue';
import { ReportData } from '../types/report';
import Vue from 'vue';

export default Vue.extend({
  name: 'Report',

  components: {
    ErrorCard,
    LoadingSpinner,
    FirstStep,
    SecondStep,
    ThirdStep,
    FourthStep,
    ThankYouStep,
  },

  data(): ReportData {
    return {
      step: 1,
      steps: 5,
    };
  },

  computed: {
    isValid(): string {
      return this.$store.state.report.validForm;
    },
    isLoading(): boolean {
      return this.$store.state.report.isLoading;
    },
    apiError(): boolean {
      return this.$store.state.report.error;
    },
  },

  mounted() {
    this.step = 1;
    this.$store.commit('report/setStep', 1);
    this.$store.commit('report/setValidForm', true);
    this.$store.commit('report/setEdited', false);
    const booking = Number(this.$route.params.booking_id);
    this.$store.commit('report/setBookingID', booking);
    this.$store.dispatch('report/FETCH_BOOKING', booking);
  },

  methods: {
    nextStep(n: number) {
      this.step = ++n % (this.steps + 1);
      this.$store.commit('report/setStep', Number(this.$store.state.report.step) + 1);
    },
    prevStep(n: number) {
      this.step = --n % (this.steps + 1);
      this.$store.commit('report/setStep', Number(this.$store.state.report.step) - 1);
      if (this.step === 1) {
        this.$store.commit('report/setValidForm', true);
      }
    },
    done() {
      this.$store.dispatch('report/CREATE_REPORT', this.$store.state.report.reportData);
    },
    resetReportInfo() {},
  },
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
