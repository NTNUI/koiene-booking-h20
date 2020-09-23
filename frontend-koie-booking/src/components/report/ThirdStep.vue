<template>
  <ErrorCard v-if="apiError" />
  <LoadingSpinner v-else-if="isLoading" />
  <v-layout v-else :class="$style.container" :dark="true">
    <h1 :class="$style.heading">{{ $t('report.step3') }}</h1>
    <v-layout :class="$style.separator">
      <v-form v-model="validForm" :class="$style.form">
        <v-list class="transparent">
          <v-row>
            <v-col align-self="center" xs="2">Item</v-col>
            <v-col align-self="center" xs="10">
              <v-col xs="4">Ok</v-col>
              <v-col xs="4">Not sure</v-col>
              <v-col xs="4">Broken/missing</v-col>
            </v-col>
          </v-row>

          <v-row v-for="item in equipment" :key="item.name" justify="space-around">
            <v-col align-self="center" xs="4">{{ item.name }}</v-col>
            <v-col align-self="center" xs="8">
              <v-radio-group v-model="item.status" row>
                <v-row>
                  <v-col xs="4"><v-radio></v-radio></v-col>
                  <v-col xs="4"><v-radio></v-radio></v-col>
                  <v-col xs="4"><v-radio></v-radio></v-col>
                </v-row>
              </v-radio-group>
            </v-col>
          </v-row>
        </v-list>
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
      equipment: [
        { name: 'Gas Burner/Primus', status: -1 },
        { name: 'Axe', status: -1 },
        { name: 'Saw', status: -1 },
        { name: 'Saw blade', status: -1 },
        { name: 'Spade', status: -1 },
        { name: 'Kerosene lamp', status: -1 },
        { name: 'Saw bench', status: -1 },
        { name: 'Detergent', status: -1 },
        { name: 'Plates, cups, and cutlery', status: -1 },
        { name: 'Pots and frying pan', status: -1 },
        { name: 'Cabin book', status: -1 },
        { name: 'Hammer', status: -1 },
        { name: 'Fire blanket', status: -1 },
        { name: 'Fire extinguisher', status: -1 },
        { name: 'Candle holders', status: -1 }
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
