<template>
  <ErrorCard v-if="apiError" />
  <LoadingSpinner v-else-if="isLoading" />
  <v-layout v-else :class="$style.container" :dark="true">
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
import ErrorCard from '@/components/ErrorCard.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { ReportFourthStepData } from '@/types/report';
import Vue from 'vue';
export default Vue.extend({
  name: 'ReportFourthStep',
  components: {
    ErrorCard,
    LoadingSpinner
  },
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
    },
    apiError(): boolean {
      return this.$store.state.report.error;
    },
    isLoading(): boolean {
      return this.$store.state.report.isLoading;
    }
  },
  methods: {
    setBoatStatus() {
      this.$store.dispatch('report/SET_BOAT_SATUS', this.boat_status);
      this.$store.dispatch('report/SET_EDITED', true);
    },
    setCanoeStatus() {
      this.$store.dispatch('report/SET_CANOE_STATUS', this.canoe_status);
      this.$store.dispatch('report/SET_EDITED', true);
    },
    setLifeJacketsStatus() {
      this.$store.dispatch('report/SET_LIFE_JACKETS_STATUS', this.life_jackets_status);
      this.$store.dispatch('report/SET_EDITED', true);
    },
    setFeedback() {
      this.$store.dispatch('report/SET_FEEDBACK', this.feedback);
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
