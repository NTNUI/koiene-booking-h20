<template>
  <KeyTable title="Levering" description="Nøkler skal leveres innen en uke etter sluttdato" :items="allKeyDeliveries">
    <template slot="row" slot-scope="row">
      <KeyDetailsRow :key-detail="row.row.item" :is-pickup="false" :get-color-fn="getColorForDelivery">
        <template v-slot:keyStatusSelector>
          <KeyStatusSelector
            :items="keyDeliverStatusOptions"
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
import { getKeyDeliveries } from '../../../tests/unit/__mocks__/keys';
import { addToDate } from '@/utils/dates';
import dayjs from 'dayjs';
import scssVars from '@/styles/variables.scss';
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
  methods: {
    getColorForDelivery(endDate: string): { color: string } {
      const limit = addToDate(endDate, 7, 'day');
      const today = dayjs().format('YYYY-MM-DD');
      if (today.localeCompare(limit) > 0) return { color: '#FF5722' };
      return { color: 'white' };
    },
  },
  computed: {
    allKeyDeliveries(): Array<KeyDetail> {
      return this.$store.getters['keyDetails/getDeliveryKeysArray'];
    },
  },
  mounted() {
    this.$store.dispatch('keyDetails/MOUNT_KEY_DELIVERIES');
  },
});
</script>

<style scoped></style>
