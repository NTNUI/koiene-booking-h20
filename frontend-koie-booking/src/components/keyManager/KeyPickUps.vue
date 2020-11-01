<template>
  <KeyTable title="Utlevering" description="Nøkler kan tidligst bli plukket opp to dager før startdato" :items="items">
    <template slot="row" slot-scope="row">
      <KeyDetailsRow :key-detail="row.row.item" :is-pickup="true" :color-fn="getColorForPickUp" />
      <tr style="color: #4CAF50; height: 10px" />
    </template>
  </KeyTable>
</template>

<script lang="ts">
import Vue from 'vue';
import KeyTable from '@/components/keyManager/KeyTable.vue';
import KeyDetailsRow from '@/components/keyManager/KeyDetailsRow.vue';
import { getKeyPickUps } from '../../../tests/unit/__mocks__/keys';
import dayjs from 'dayjs';
import scssVars from '@/styles/variables.scss';

export default Vue.extend({
  name: 'KeyPickUps',
  components: { KeyDetailsRow, KeyTable },
  data() {
    return {
      items: getKeyPickUps(),
    };
  },
  methods: {
    getColorForPickUp(startDate: string): { color: string } {
      const today = dayjs().format('YYYY-MM-DD');
      if (today.localeCompare(startDate) > 0) return { color: scssVars.globalColorRedWeak };
      return { color: 'white' };
    },
  },
});
</script>

<style scoped></style>
