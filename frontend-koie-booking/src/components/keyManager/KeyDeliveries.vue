<template>
  <KeyTable title="Levering" description="Nøkler skal leveres innen en uke etter sluttdato" :items="items">
    <template slot="row" slot-scope="row">
      <KeyDeliveryRow :key-detail="row.row.item" />
      <tr style="color: #4CAF50; height: 10px" />
    </template>
  </KeyTable>
</template>

<script lang="ts">
import Vue from 'vue';
import KeyTable from '@/components/keyManager/KeyTable.vue';
import KeyDeliveryRow from '@/components/keyManager/KeyDeliveryRow.vue';
import { getKeyDeliveries } from '../../../tests/unit/__mocks__/keys';

export default Vue.extend({
  name: 'KeyPickUps',
  components: { KeyDeliveryRow, KeyTable },
  data() {
    return {
      items: getKeyDeliveries(),
    };
  },
});
</script>

<style scoped></style>
