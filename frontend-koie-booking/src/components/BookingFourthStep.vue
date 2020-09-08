<template>
  <v-layout :class="$style.layout">
    <v-row>
      <v-col>
        <h1 :class="$style.receiptTitle">{{ $t('booking.payment_completed') }}</h1>
        <p>
          {{ $t('booking.receipt_text') }}
        </p>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'BookingFourthStep',
  mounted() {
    this.$store.dispatch('booking/SET_EDITED', false);
  }
});
</script>

<style lang="scss" module>
.layout {
  display: flex;
  flex-direction: column;
}
.receiptTitle {
  text-align: center;
  margin-bottom: 5px;
}
</style>
