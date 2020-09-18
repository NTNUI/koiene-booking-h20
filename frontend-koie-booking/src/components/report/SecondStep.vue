<template>
  <ErrorCard v-if="apiError" />
  <LoadingSpinner v-else-if="isLoading" />
  <v-layout v-else :class="$style.container" :dark="true">
    <h1 :class="$style.heading">{{ $t('report.step2') }}</h1>
    <v-form v-model="validForm" :class="$style.form">
      <v-layout :class="$style.separator">
        <h3 class="py-4" :class="$style.supplyRegistration">{{ $t('report.gass_level') }}</h3>
        <v-layout class="px-4">
          <v-radio-group
            v-model="gasStatus"
            required
            hide-details="false"
            :rules="gasRules"
            :color="$scssVars.globalColorBackgroundLight"
            @blur="setGuests"
          >
            <v-radio :label="$t('report.full')"></v-radio>
            <v-radio :label="$t('report.almost_empty')"></v-radio>
            <v-radio :label="$t('report.empty')"></v-radio>
            <v-radio :label="$t('report.not_sure')"></v-radio>
          </v-radio-group>
        </v-layout>
      </v-layout>
      <v-layout :class="$style.separator">
        <h3 class="py-4" :class="$style.supplyRegistration">{{ $t('report.wood_level') }}</h3>
        <v-layout class="px-4">
          <v-slider
            v-model="woodLevel"
            required
            :rules="woodRules"
            :tick-labels="woodLabels"
            :max="4"
            step="1"
            ticks="always"
            tick-size="5"
            @blur="setWoodLevel"
          ></v-slider>
        </v-layout>
      </v-layout>
    </v-form>
  </v-layout>
</template>

<script lang="ts">
import ErrorCard from '@/components/ErrorCard.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { ReportSecondStepData } from '@/types/report';
import Vue from 'vue';
export default Vue.extend({
  name: 'ReportSecondStep',
  components: {
    ErrorCard,
    LoadingSpinner
  },
  data(): ReportSecondStepData {
    return {
      edited: false,
      validForm: true,
      gasStatus: -1,
      woodLevel: -1,
      woodLabels: ['No logs', '', '', '', 'A lot of logs']
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
    gasRules(): (true | string)[] {
      return [this.gasStatus >= 0 || 'At least one item should be selected'];
    },
    woodRules(): (true | string)[] {
      return [this.woodLevel >= 0 || 'At least one item should be selected'];
    }
  },
  watch: {
    validForm: function() {
      console.log(this.gasStatus);
      this.$store.dispatch('report/SET_VALID_FORM', this.validForm);
    }
  },
  mounted() {
    this.edited = this.$store.state.report.edited;
    this.$store.dispatch('booking/SET_VALID_FORM', this.validForm);
  },
  methods: {
    setGasStatus() {
      this.$store.dispatch('report/SET_GAS_STATUS', this.gasStatus);
      this.$store.dispatch('report/SET_EDITED', true);
    },
    setWoodLevel() {
      this.$store.dispatch('report/SET_WOOD_LEVEL', this.woodLevel);
      this.$store.dispatch('report/SET_EDITED', true);
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
.form,
.supplyRegistration {
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
.numberField {
  padding-right: 10px;
}
</style>
