<template>
  <KeyTable title="Utlevering" description="Nøkler kan tidligst bli plukket opp to dager før startdato" :items="items">
    <template slot="row" slot-scope="row">
      <KeyPickUpRow :key-detail="row.row.item" />
      <tr style="color: #4CAF50; height: 10px" />
    </template>
  </KeyTable>
</template>

<script lang="ts">
import Vue from 'vue';
import KeyTable from '@/components/keyManager/KeyTable.vue';
import KeyPickUpRow from '@/components/keyManager/KeyPickUpRow.vue';
import { getKeyPickUps } from '../../../tests/unit/__mocks__/keys';

export default Vue.extend({
  name: 'KeyPickUps',
  components: { KeyPickUpRow, KeyTable },
  data() {
    return {
      items: getKeyPickUps(),
    };
  },
});
</script>

<style scoped></style>
