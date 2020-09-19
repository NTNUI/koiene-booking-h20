<template>
  <ErrorCard v-if="apiError" />
  <LoadingSpinner v-else-if="isLoading" />
  <v-layout v-else :class="$style.container" :dark="true">
    <h1 :class="$style.heading">{{ $t('report.step3') }}</h1>
    <v-layout :class="$style.separator">
      <v-form v-model="validForm" :class="$style.form">
        <v-data-table
          class="transparent"
          disable-sort
          disable-filtering
          disable-pagination
          hide-default-footer
          :headers="equipmentHeaders"
          :items="equipment"
        >
          <template v-slot:[`item.status[0]`]="{ item }">
            <v-checkbox
              v-model="item.status[0]"
              class="align-center justify-center"
              on-icon="$radioOn"
              off-icon="$radioOff"
            ></v-checkbox>
          </template>
          <template v-slot:[`item.status[1]`]="{ item }">
            <v-checkbox
              v-model="item.status[1]"
              class="align-center justify-center"
              on-icon="$radioOn"
              off-icon="$radioOff"
            ></v-checkbox>
          </template>
          <template v-slot:[`item.status[2]`]="{ item }">
            <v-checkbox
              v-model="item.status[2]"
              class="align-center justify-center"
              on-icon="$radioOn"
              off-icon="$radioOff"
            ></v-checkbox>
          </template>
        </v-data-table>
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
        { name: 'Gas Burner/Primus', status: [true, false, false] },
        { name: 'Axe', status: [true, false, false] },
        { name: 'Saw', status: [true, false, false] },
        { name: 'Saw blade', status: [true, false, false] },
        { name: 'Spade', status: [true, false, false] },
        { name: 'Kerosene lamp', status: [true, false, false] },
        { name: 'Saw bench', status: [true, false, false] },
        { name: 'Detergent', status: [true, false, false] },
        { name: 'Plates, cups, and cutlery', status: [true, false, false] },
        { name: 'Pots and frying pan', status: [true, false, false] },
        { name: 'Cabin book', status: [true, false, false] },
        { name: 'Hammer', status: [true, false, false] },
        { name: 'Fire blanket', status: [true, false, false] },
        { name: 'Fire extinguisher', status: [true, false, false] },
        { name: 'Candle holders', status: [true, false, false] }
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
    },
    equipmentHeaders() {
      return [
        {
          text: 'Item',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        {
          text: 'Ok',
          align: 'center',
          value: 'status[0]'
        },
        {
          text: 'Uncertain',
          align: 'center',
          value: 'status[1]'
        },
        {
          text: 'Missing/broken',
          align: 'center',
          value: 'status[2]'
        }
      ];
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
