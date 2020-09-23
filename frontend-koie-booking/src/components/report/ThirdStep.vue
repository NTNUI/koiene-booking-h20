<template>
  <ErrorCard v-if="apiError" />
  <LoadingSpinner v-else-if="isLoading" />
  <v-layout v-else :class="$style.container" :dark="true">
    <h1 :class="$style.heading">{{ $t('report.step3') }}</h1>
    <v-layout :class="$style.separator">
      <h3 class="py-4" :class="$style.form">{{ $t('report.smoke_detector_is_working') }}</h3>
      <v-layout class="px-4">
        <v-radio-group
          v-model="smokeDetectorIsWorking"
          mandatory
          required
          :color="$scssVars.globalColorBackgroundLight"
          @blur="setSmokeDetectorIsWorking"
        >
          <v-radio :label="$t('report.smoke_detector_working')"></v-radio>
          <v-radio :label="$t('report.smoke_detector_not_working')"></v-radio>
        </v-radio-group>
      </v-layout>
    </v-layout>

    <v-layout :class="$style.separator">
      <h3 class="py-4" :class="$style.form">{{ $t('report.equipment_status') }}</h3>
      <v-form v-model="validForm" :class="$style.form">
        <v-row justify="space-between">
          <v-col align-self="center" xs="2" sm="4">
            <strong>{{ $t('report.equipment_name') }}</strong>
          </v-col>
          <v-col xs="10" sm="6">
            <v-row>
              <v-col>
                <strong>{{ $t('report.equipment_ok') }}</strong>
              </v-col>
              <v-col style="white-space: nowrap">
                <strong>{{ $t('report.equipment_unsure') }}</strong>
              </v-col>
              <v-col>
                <strong>{{ $t('report.equipment_broken_or_missing') }}</strong>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-divider></v-divider>

        <v-row v-for="item in equipment" :key="item.name" dense justify="space-between">
          <v-col align-self="center" xs="2" sm="4">{{ item.name }}</v-col>
          <v-col align-self="center" xs="10" sm="6">
            <v-radio-group v-model="item.status" hide-details="true" justify="center" row>
              <v-row>
                <v-col align-self="center">
                  <v-radio :color="$scssVars.globalColorWarningLow"></v-radio>
                </v-col>
                <v-col align-self="center">
                  <v-radio :color="$scssVars.globalColorWarningConsiderable"></v-radio>
                </v-col>
                <v-col align-self="center">
                  <v-radio :color="$scssVars.globalColorWarningVeryHigh"></v-radio>
                </v-col>
              </v-row>
            </v-radio-group>
          </v-col>
        </v-row>
      </v-form>
    </v-layout>
  </v-layout>
</template>

<script lang="ts">
import ErrorCard from '@/components/ErrorCard.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { ReportThirdStepData } from '@/types/report';
import Vue from 'vue';
export default Vue.extend({
  name: 'ReportThirdStep',
  components: {
    ErrorCard,
    LoadingSpinner
  },
  data(): ReportThirdStepData {
    return {
      edited: false,
      validForm: true,
      smokeDetectorIsWorking: 0,
      equipment: [
        { name: this.$t('report.equipment.gas_burner_primus'), value: -1 },
        { name: this.$t('report.equipment.axe'), value: -1 },
        { name: this.$t('report.equipment.hammer'), value: -1 },
        { name: this.$t('report.equipment.saw'), value: -1 },
        { name: this.$t('report.equipment.saw_blade'), value: -1 },
        { name: this.$t('report.equipment.saw_bench'), value: -1 },
        { name: this.$t('report.equipment.spade'), value: -1 },
        { name: this.$t('report.equipment.kerosene_lamp'), value: -1 },
        { name: this.$t('report.equipment.detergent'), value: -1 },
        { name: this.$t('report.equipment.dishware'), value: -1 },
        { name: this.$t('report.equipment.cookware'), value: -1 },
        { name: this.$t('report.equipment.cabin_book'), value: -1 },
        { name: this.$t('report.equipment.candle_holders'), value: -1 },
        { name: this.$t('report.equipment.fire_blanket'), value: -1 },
        { name: this.$t('report.equipment.fire_extinguisher'), value: -1 }
      ]
    };
  },
  computed: {
    step(): number {
      return this.$store.state.report.step;
    },
    apiError(): boolean {
      return this.$store.state.koie.error;
    },
    isLoading(): boolean {
      return this.$store.state.koie.isLoading;
    },
    equipmentRules(): (true | string)[] {
      return [this.equipment.length >= 0 || 'At least one item should be selected'];
    }
  },
  watch: {
    validForm: function() {
      this.$store.dispatch('report/SET_VALID_FORM', this.validForm);
    }
  },
  mounted() {
    this.edited = this.$store.state.report.edited;
    this.$store.dispatch('booking/SET_VALID_FORM', this.validForm);
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
.form {
  padding-left: 16px;
  padding-right: 16px;
  @media only screen and (max-width: 600px) {
    padding-left: 8px;
    padding-right: 8px;
  }
}
.fieldWrapper {
  display: flex;
  width: 100%;
  align-items: center;
}
</style>
