<template>
  <v-layout :class="$style.container" :dark="true">
    <h1 :class="$style.heading">{{ $t('report.step3') }}</h1>
    <v-form v-model="validForm" :class="$style.form">
      <v-layout :class="$style.separator">
        <h3 class="py-4" :class="$style.supplyRegistration">{{ $t('report.water_equipment.boat') }}</h3>
        <v-layout class="px-4">
          <v-radio-group v-model="boatStatus" mandatory required :color="$scssVars.globalColorBackgroundLight">
            <v-radio :value="3" :label="$t('report.water_equipment.missing_boat')"></v-radio>
            <v-radio :value="1" :label="$t('report.water_equipment.broken')"></v-radio>
            <v-radio :value="2" :label="$t('report.water_equipment.missing_paddles')"></v-radio>
            <v-radio :value="4" :label="$t('report.water_equipment.unsure')"></v-radio>
            <v-radio :value="0" :label="$t('report.water_equipment.no_faults')"></v-radio>
          </v-radio-group>
        </v-layout>
      </v-layout>
      <v-layout :class="$style.separator">
        <h3 class="py-4" :class="$style.supplyRegistration">{{ $t('report.water_equipment.canoe') }}</h3>
        <v-layout class="px-4">
          <v-radio-group v-model="canoeStatus" mandatory required :color="$scssVars.globalColorBackgroundLight">
            <v-radio :value="3" :label="$t('report.water_equipment.missing_canoe')"></v-radio>
            <v-radio :value="1" :label="$t('report.water_equipment.broken')"></v-radio>
            <v-radio :value="2" :label="$t('report.water_equipment.missing_paddles')"></v-radio>
            <v-radio :value="4" :label="$t('report.water_equipment.unsure')"></v-radio>
            <v-radio :value="0" :label="$t('report.water_equipment.no_faults')"></v-radio>
          </v-radio-group>
        </v-layout>
      </v-layout>
      <v-layout :class="$style.separator">
        <h3 class="py-4" :class="$style.supplyRegistration">{{ $t('report.water_equipment.life_jackets') }}</h3>
        <v-layout class="px-4">
          <v-radio-group v-model="lifeJacketsStatus" mandatory required :color="$scssVars.globalColorBackgroundLight">
            <v-radio :value="2" :label="$t('report.water_equipment.missing_life_jackets')"></v-radio>
            <v-radio :value="1" :label="$t('report.water_equipment.broken')"></v-radio>
            <v-radio :value="3" :label="$t('report.water_equipment.unsure')"></v-radio>
            <v-radio :value="0" :label="$t('report.water_equipment.no_faults')"></v-radio>
          </v-radio-group>
        </v-layout>
      </v-layout>
    </v-form>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { ReportThirdStepData } from '../../types/report';

export default Vue.extend({
  name: 'ReportThirdStep',
  data(): ReportThirdStepData {
    return {
      validForm: true,
    };
  },
  computed: {
    boatStatus: {
      get() {
        return this.$store.state.report.reportData.boat_status;
      },
      set(value: number) {
        this.$store.commit('report/setBoatStatus', value);
        this.$store.commit('report/setEdited', true);
      },
    },
    canoeStatus: {
      get() {
        return this.$store.state.report.reportData.canoe_status;
      },
      set(value: number) {
        this.$store.commit('report/setCanoeStatus', value);
        this.$store.commit('report/setEdited', true);
      },
    },
    lifeJacketsStatus: {
      get() {
        return this.$store.state.report.reportData.life_jackets_status;
      },
      set(value: number) {
        this.$store.commit('report/setLifeJacketsStatus', value);
        this.$store.commit('report/setEdited', true);
      },
    },
  },
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
.feedbackField {
  width: 100%;
  padding-right: 10px;
}
</style>
