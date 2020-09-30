<template>
  <v-layout :class="$style.container" :dark="true">
    <h1 :class="$style.heading">{{ $t('report.step4') }}</h1>
    <v-layout :class="$style.separator">
      <h3 class="py-4" :class="$style.supplyRegistration">{{ $t('report.water_equipment.boat') }}</h3>
      <v-layout class="px-4">
        <v-radio-group
          v-model="boat_status"
          mandatory
          required
          :color="$scssVars.globalColorBackgroundLight"
          @change="setBoatStatus"
        >
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
        <v-radio-group
          v-model="canoe_status"
          mandatory
          required
          :color="$scssVars.globalColorBackgroundLight"
          @change="setCanoeStatus"
        >
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
        <v-radio-group
          v-model="life_jackets_status"
          mandatory
          required
          :color="$scssVars.globalColorBackgroundLight"
          @change="setLifeJacketsStatus"
        >
          <v-radio :value="2" :label="$t('report.water_equipment.missing_life_jackets')"></v-radio>
          <v-radio :value="1" :label="$t('report.water_equipment.broken')"></v-radio>
          <v-radio :value="3" :label="$t('report.water_equipment.unsure')"></v-radio>
          <v-radio :value="0" :label="$t('report.water_equipment.no_faults')"></v-radio>
        </v-radio-group>
      </v-layout>
    </v-layout>
    <v-layout :class="$style.separator">
      <h3 class="py-4" :class="$style.form">{{ $t('report.general_feedback') }}</h3>
      <v-layout class="px-4">
        <v-text-field
          v-model="feedback"
          :label="$t('report.general_feedback_label')"
          :placeholder="$t('report.general_feedback_placeholder')"
          :class="$style.feedbackField"
          @change="setFeedback"
        />
      </v-layout>
    </v-layout>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { ReportFourthStepData } from '../../types/report';

export default Vue.extend({
  name: 'ReportFourthStep',
  data(): ReportFourthStepData {
    return {
      edited: false,
      validForm: true,
      boat_status: 0,
      canoe_status: 0,
      life_jackets_status: 0,
      feedback: ''
    };
  },
  computed: {
    step(): number {
      return this.$store.state.report.step;
    }
  },
  methods: {
    setBoatStatus() {
      this.$store.commit('report/setBoatStatus', this.boat_status);
      this.$store.commit('report/setEdited', true);
    },
    setCanoeStatus() {
      this.$store.commit('report/setCanoeStatus', this.canoe_status);
      this.$store.commit('report/setEdited', true);
    },
    setLifeJacketsStatus() {
      this.$store.commit('report/setLifeJacketsStatus', this.life_jackets_status);
      this.$store.commit('report/setEdited', true);
    },
    setFeedback() {
      this.$store.commit('report/setFeedback', this.feedback);
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
.feedbackField {
  width: 100%;
  padding-right: 10px;
}
</style>
