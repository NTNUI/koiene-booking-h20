<template>
  <KeyTable title="Utlevering" description="Nøkler kan tidligst bli plukket opp to dager før startdato" :items="items">
    <template v-slot:row="row">
      <KeyDetailsRow :key-detail="row.row.item" :is-pickup="true" :get-color-fn="getColorForPickUp">
        <template v-slot:keyStatusSelector>
          <KeyStatusSelector
            :items="keyPickUpStatusOptions"
            :status="row.row.item.keyStatus"
            :uuid="row.row.item.uuid"
            :koieSlug="row.row.item.koieName"
          />
        </template>
      </KeyDetailsRow>
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
import KeyStatusSelector from '@/components/keyManager/KeyStatusSelector.vue';
import { keyPickUpStatusOptions } from '@/components/keyManager/keyStatusOptions';

export default Vue.extend({
  name: 'KeyPickUps',
  components: { KeyStatusSelector, KeyDetailsRow, KeyTable },
  data() {
    return {
      items: getKeyPickUps(),
      keyPickUpStatusOptions: keyPickUpStatusOptions,
    };
  },
  methods: {
    getColorForPickUp(startDate: string): { color: string } {
      const today = dayjs().format('YYYY-MM-DD');
      if (today.localeCompare(startDate) > 0) return { color: '#FF5722' };
      return { color: 'white' };
    },
  },
});
</script>

<style scoped></style>
