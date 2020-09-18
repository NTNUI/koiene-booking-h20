<template>
  <ErrorCard v-if="apiError" />
  <LoadingSpinner v-else-if="isLoading" />
  <v-layout v-else :class="$style.container" :dark="true">
    <h1 :class="$style.heading">{{ $t('report.step2') }}</h1>
    <v-layout :class="$style.separator">
      <h3 class="py-4" :class="$style.supplyRegistration">{{ $t('report.gass_level') }}</h3>
      <v-form v-model="validForm" :class="$style.form">
        <v-layout class="px-1">
          <v-radio-group :mandatory="true" :color="$scssVars.globalColorBackgroundLight">
            <v-radio :label="$t('report.full')"></v-radio>
            <v-radio :label="$t('report.almost_empty')"></v-radio>
            <v-radio :label="$t('report.empty')"></v-radio>
            <v-radio :label="$t('report.not_sure')"></v-radio>
          </v-radio-group>
        </v-layout>
      </v-form>
    </v-layout>
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
      gasStatus: 0,
      numberOfGasContainers: 0,
      edited: false,
      validForm: true
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
    }
  },
  watch: {
    validForm: function() {
      this.$store.dispatch('booking/SET_VALID_FORM', this.validForm);
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
