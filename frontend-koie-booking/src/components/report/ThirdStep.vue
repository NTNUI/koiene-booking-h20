<template>
  <v-layout :class="$style.container" :dark="true">
    <h1 :class="$style.heading">{{ $t('report.step3') }}</h1>
    <v-layout :class="$style.separator">
      <h3 class="py-4" :class="$style.form">{{ $t('report.smoke_detector_is_working') }}</h3>
      <v-layout class="px-4">
        <v-radio-group
          v-model="smokeDetectorIsWorking"
          mandatory
          required
          :color="$scssVars.globalColorBackgroundLight"
          @change="setSmokeDetectorIsWorking"
        >
          <v-radio :label="$t('report.smoke_detector_working')"></v-radio>
          <v-radio :label="$t('report.smoke_detector_not_working')"></v-radio>
        </v-radio-group>
      </v-layout>
    </v-layout>

    <v-layout :class="$style.separator">
      <v-form v-model="validForm" :class="$style.form">
        <h3 class="py-4" :class="$style.form">{{ $t('report.equipment_status') }}</h3>
        <v-list class="overflow-x-auto" color="transparent">
          <v-row class="flex-nowrap" justify="space-between">
            <v-col align-self="center" sm="4">
              <strong>{{ $t('report.equipment_name') }}</strong>
            </v-col>
            <v-col sm="6">
              <v-row class="flex-nowrap">
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
          <v-row v-for="item in equipment" :key="item.displayName" class="flex-nowrap" dense justify="space-between">
            <v-col style="white-space: nowrap" align-self="center" xs="6" sm="4">{{ item.displayName }}</v-col>
            <v-col xs="4" sm="6">
              <v-radio-group
                v-model="item.value"
                hide-details="true"
                row
                @change="setEquipment(item.mutation, item.value)"
              >
                <v-row class="flex-nowrap">
                  <v-col>
                    <v-radio :color="$scssVars.globalColorWarningLow"></v-radio>
                  </v-col>
                  <v-col>
                    <v-radio :color="$scssVars.globalColorWarningConsiderable"></v-radio>
                  </v-col>
                  <v-col>
                    <v-radio :color="$scssVars.globalColorWarningVeryHigh"></v-radio>
                  </v-col>
                </v-row>
              </v-radio-group>
            </v-col>
          </v-row>
        </v-list>
      </v-form>
    </v-layout>
    <v-layout :class="$style.separator">
      <h3 class="py-4" :class="$style.form">{{ $t('report.other_faults') }}</h3>
      <v-layout class="px-4">
        <v-text-field
          v-model="otherFaults"
          :label="$t('report.other_faults_label')"
          :placeholder="$t('report.other_faults_placeholder')"
          :class="$style.otherFaultsField"
          @change="setOtherFaults"
        />
      </v-layout>
    </v-layout>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import ErrorCard from '@/components/ErrorCard.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { ReportThirdStepData } from '../../types/report';
import { TranslateResult } from 'vue-i18n';

export default Vue.extend({
  name: 'ReportThirdStep',
  data(): ReportThirdStepData {
    return {
      validForm: true,
      smokeDetectorIsWorking: 0,
      equipment: [
        {
          displayName: this.$t('report.equipment.gas_burner_primus'),
          value: 1,
          mutation: 'setGasBurnerPrimus'
        },
        { displayName: this.$t('report.equipment.axe'), value: 1, mutation: 'setAxe' },
        { displayName: this.$t('report.equipment.hammer'), value: 1, mutation: 'setHammer' },
        { displayName: this.$t('report.equipment.saw'), value: 1, mutation: 'setSaw' },
        { displayName: this.$t('report.equipment.saw_blade'), value: 1, mutation: 'setSawBlade' },
        { displayName: this.$t('report.equipment.saw_bench'), value: 1, mutation: 'setSawBench' },
        { displayName: this.$t('report.equipment.spade'), value: 1, mutation: 'setSpade' },
        {
          displayName: this.$t('report.equipment.kerosene_lamp'),
          value: 1,
          mutation: 'setKeroseneLamp'
        },
        { displayName: this.$t('report.equipment.detergent'), value: 1, mutation: 'setDetergent' },
        { displayName: this.$t('report.equipment.dishware'), value: 1, mutation: 'setDishware' },
        { displayName: this.$t('report.equipment.cookware'), value: 1, mutation: 'setCookware' },
        { displayName: this.$t('report.equipment.cabin_book'), value: 1, mutation: 'setCabinBook' },
        {
          displayName: this.$t('report.equipment.candle_holders'),
          value: 1,
          mutation: 'setCandleHolders'
        },
        {
          displayName: this.$t('report.equipment.fire_blanket'),
          value: 1,
          mutation: 'setFireBlanket'
        },
        {
          displayName: this.$t('report.equipment.fire_extinguisher'),
          value: 1,
          mutation: 'setFireExtinguisher'
        }
      ],
      otherFaults: ''
    };
  },
  methods: {
    setSmokeDetectorIsWorking() {
      this.$store.commit('report/setSmokeDetectorIsWorking', !this.smokeDetectorIsWorking);
      this.$store.commit('report/setEdited', true);
    },
    setEquipment(mutation: string, equipmentStatus: number) {
      this.$store.commit(`report/${mutation}`, equipmentStatus);
      this.$store.commit('report/setEdited', true);
    },
    setOtherFaults() {
      this.$store.commit('report/setOtherFaults', this.otherFaults);
      this.$store.commit('report/setEdited', true);
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
.otherFaultsField {
  width: 100%;
  padding-right: 10px;
}
</style>
