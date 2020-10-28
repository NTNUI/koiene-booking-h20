<template>
  <KeyTable
    title="Utlevering (Neste to dager)"
    description="Nøkler kan tidligst bli plukket opp to dager før startdato"
  >
    <template slot="row" slot-scope="row">
      <KeyPickUpRow :key-detail="row" />
    </template>
  </KeyTable>
</template>

<script lang="ts">
import Vue from 'vue';
import KeyTable from '@/components/keyManager/KeyTable.vue';
import KeyPickUpRow from '@/components/keyManager/KeyPickUpRow.vue';

export default Vue.extend({
  name: 'KeyPickUps',
  components: { KeyPickUpRow, KeyTable },
});
</script>

<style scoped></style>
