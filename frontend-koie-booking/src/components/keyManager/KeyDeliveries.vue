<template>
  <KeyTable title="Levering" description="Nøkler skal leveres innen en uke etter sluttdato" :items="allKeyDeliveries">
    <template slot="row" slot-scope="row">
      <KeyDetailsRow :key-detail="row.row.item" :is-pickup="false" :get-color-fn="getColorForDelivery">
        <template v-slot:keyStatusSelector>
          <KeyStatusSelector
            :items="keyDeliverStatusOptions"
            :status="row.row.item.keyStatus"
            :uuid="row.row.item.uuid"
            :koie-slug="row.row.item.koie"
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
import { addToDate } from '@/utils/dates';
import dayjs from 'dayjs';
import KeyStatusSelector from '@/components/keyManager/KeyStatusSelector.vue';
import { keyDeliverStatusOptions } from '@/components/keyManager/keyStatusOptions';
import KeyDetail from '@/types/keyManager/KeyDetail';

export default Vue.extend({
  name: 'KeyPickUps',
  components: { KeyStatusSelector, KeyDetailsRow, KeyTable },
  data() {
    return {
      keyDeliverStatusOptions: keyDeliverStatusOptions,
    };
  },
  computed: {
    allKeyDeliveries(): Array<KeyDetail> {
      return this.$store.getters['keyManager/getDeliveryKeysArray'];
    },
  },
  mounted() {
    this.$store.dispatch('keyManager/MOUNT_KEY_DELIVERIES');
  },
  methods: {
    getColorForDelivery(endDate: string): { color: string } {
      const limit = addToDate(endDate, 7, 'day');
      const today = dayjs().format('YYYY-MM-DD');
      if (today.localeCompare(limit) > 0) return { color: '#FF5722' };
      return { color: 'white' };
    },
  },
});
</script>

<style scoped></style>
