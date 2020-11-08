<template>
  <div>
    <v-row justify="center">
      <h1 style="padding-top: 30px">Nøkkeloversikt</h1>
    </v-row>
    <v-row>
      <v-col cols="6">
        <KeyPickUps />
      </v-col>
      <v-col cols="6">
        <KeyDeliveries />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Vue from 'vue';
import KeyPickUps from '@/components/keyManager/KeyPickUps.vue';
import KeyDeliveries from '@/components/keyManager/KeyDeliveries.vue';

export default Vue.extend({
  name: 'KeyManagerOverview',
  components: { KeyDeliveries, KeyPickUps },
});
</script>

<style scoped></style>
