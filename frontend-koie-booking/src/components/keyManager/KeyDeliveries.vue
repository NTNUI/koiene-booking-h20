<template>
  <KeyTable title="Levering" description="Nøkler skal leveres innen en uke etter sluttdato" :items="items">
    <template slot="row" slot-scope="row">
      <KeyDetailsRow :key-detail="row.row.item" :is-pickup="false" :get-color-fn="getColorForDelivery" />
      <tr style="color: #4CAF50; height: 10px" />
    </template>
  </KeyTable>
</template>

<script lang="ts">
import Vue from 'vue';
import KeyTable from '@/components/keyManager/KeyTable.vue';
import KeyDetailsRow from '@/components/keyManager/KeyDetailsRow.vue';
import { getKeyDeliveries } from '../../../tests/unit/__mocks__/keys';
import { addToDate } from '@/utils/dates';
import dayjs from 'dayjs';
import scssVars from '@/styles/variables.scss';

export default Vue.extend({
  name: 'KeyPickUps',
  components: { KeyDetailsRow, KeyTable },
  data() {
    return {
      items: getKeyDeliveries(),
    };
  },
  methods: {
    getColorForDelivery(endDate: string): { color: string } {
      const limit = addToDate(endDate, 7, 'day');
      const today = dayjs().format('YYYY-MM-DD');
      if (today.localeCompare(limit) > 0) return { color: scssVars.globalColorRedWeak };
      return { color: 'white' };
    },
  },
});
</script>

<style scoped></style>
