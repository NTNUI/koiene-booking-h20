<template>
  <v-container :class="$style.container">
    <v-row>
      <v-col class="global-card-outlined">
        <v-card class="global-card-outlined">
          <h3 :class="$style.priceStyle">Total price: {{ price }}kr</h3>
          <Card
            :class="[{ complete }, $style.stripeCard]"
            :options="stripeOptions"
            stripe="pk_test_TagT9jGDj7CN9NOQfTnueTxz"
            @change="complete = $event.complete"
          />
          <v-btn
            color="blue"
            class="pay-with-stripe"
            :disabled="!complete"
            width="100%"
            :class="$style.payCardBtn"
            @click="pay"
            >Pay with credit card</v-btn
          >
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { Card, createToken } from 'vue-stripe-elements-plus';
import { stripeKey, stripeOptions } from '@/stripeConfig.json';
import { BookingThirdStepData } from '@/types/booking';

export default Vue.extend({
  components: { Card },
  data(): BookingThirdStepData {
    return {
      complete: false,
      stripeOptions: {},
      totalPrice: 0
    };
  },
  computed: {
    price(): number {
      return this.$store.state.booking.bookingData.booking.price || 0;
    }
  },
  mounted() {
    if (this.$store.state.booking.error) {
      this.$store.dispatch('booking/SET_STEP', 1);
      this.$notify({
        group: 'memberships_system',
        type: 'error',
        duration: 3000,
        text: `${this.$t('booking.error_msg')}`
      });
    }
  },
  methods: {
    pay() {
      createToken().then(async (data: any) => {
        const transaction_id = await this.$store.state.booking.bookingData.booking.booking_transaction_id;
        const values = { token: data.token.id, id: transaction_id };
        this.$store.dispatch('booking/INITIATE_PAYMENT', values);
      });
    }
  }
});
</script>

<style lang="scss" module>
.container {
  width: 400px;
}

.stripeCard {
  width: 100%;
  border: 1px solid grey;
  padding: 10px;
  background-color: white;
  border-radius: 4px;
}

.payCardBtn {
  margin-top: 10px !important;
  width: 100% !important;
}

.stripeCard.complete {
  border: 2px solid rgb(29, 252, 29);
}
.priceStyle {
  margin-bottom: 20px;
  margin-top: 5px;
  text-align: center;
}
</style>
