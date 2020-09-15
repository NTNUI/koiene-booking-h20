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
            <FirstStep v-else-if="step === 1" />
            <SecondStep v-else-if="step === 2" />
            <ThirdStep v-else-if="step === 3" />
            <FourthStep v-else-if="step === 4" />
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
            >{{ $t('report.back_button') }}</v-btn
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
            >{{ $t('report.next_button') }}</v-btn
          >
          <v-btn
            v-if="step === 4"
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
import FirstStep from '../components/report/FirstStep.vue';
import SecondStep from '../components/report/SecondStep.vue';
import ThirdStep from '../components/report/ThirdStep.vue';
import FourthStep from '../components/report/FourthStep.vue';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import { ReportData } from '../types/booking';
import Vue from 'vue';
export default Vue.extend({
  name: 'Report',

  components: {
    FirstStep,
    SecondStep,
    ThirdStep,
    FourthStep,
    LoadingSpinner
  },

  data(): ReportData {
    return {
      step: 1,
      labels: [
        this.$i18n.t('report.step1'),
        this.$i18n.t('report.step2'),
        this.$i18n.t('report.step3'),
        this.$i18n.t('report.step4')
      ]
    };
  },
  mounted() {
    this.step = 1;
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
