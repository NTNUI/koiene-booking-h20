<template>
  <ErrorCard v-if="apiError" />
  <LoadingSpinner v-else-if="isLoading" />
  <v-layout v-else :class="$style.container" :dark="true">
    <h1 :class="$style.heading">{{ $t('report.step2') }}</h1>
    <v-form v-model="validForm" :class="$style.form">
      <v-layout :class="$style.separator">
        <h3 class="py-4" :class="$style.supplyRegistration">{{ $t('report.gass_is_full') }}</h3>
        <v-layout class="px-4">
          <v-radio-group
            v-model="gasIsFull"
            mandatory
            required
            :color="$scssVars.globalColorBackgroundLight"
            @blur="setGasIsFull"
          >
            <v-radio :label="$t('report.gass_full')"></v-radio>
            <v-radio :label="$t('report.gass_empty')"></v-radio>
          </v-radio-group>
        </v-layout>
      </v-layout>
      <v-layout :class="$style.separator">
        <h3 class="py-4" :class="$style.supplyRegistration">{{ $t('report.wood_supply') }}</h3>
        <v-layout class="px-4">
          <v-slider
            v-model="woodSupply"
            required
            :rules="woodSupply"
            :tick-labels="woodSupplyLabels"
            :max="4"
            step="1"
            ticks="always"
            tick-size="5"
            @blur="setWoodSupply"
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
      gasIsFull: 1,
      woodSupply: -1,
      woodSupplyLabels: [`${t('report.wood_supply_empty')}`, '', '', '', `${t('report.wood_supply_full')}`]
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
    woodSupplyRules(): (true | string)[] {
      return [this.woodSupply >= 0 || 'At least one item should be selected'];
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
  },
  methods: {
    setGasIsFull() {
      console.log(this.gasIsFull);
      this.$store.dispatch('report/SET_GAS_IS_EMPTY', this.gasIsFull);
      this.$store.dispatch('report/SET_EDITED', true);
    },
    setWoodSupply() {
      this.$store.dispatch('report/SET_WOOD_SUPPLY', this.woodSupply);
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
