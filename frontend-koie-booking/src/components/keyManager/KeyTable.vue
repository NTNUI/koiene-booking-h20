<template>
  <v-row style="height: 60%; background-color: black">
    <v-row justify="center">
      <v-col>
        {{ title }}
      </v-col>
      <v-col>
        {{ description }}
      </v-col>
    </v-row>
    <v-data-table
      style="width: 100%"
      :headers="headers"
      :items="items"
      :items-per-page="24"
      :hide-default-footer="true"
      :loading="loading"
      loading-text="Henter inn status for nøkler"
      no-data-text="Det skjedde noe feil da vi prøvde å hente status for nøkler"
    >
      <template slot="item" slot-scope="row">
        <slot name="row" :row="row" />
      </template>
    </v-data-table>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';

import keyTableHeaders from '@/components/keyManager/keyTableHeaders';
import KeyDetail from '@/types/keyManager/KeyDetail';

export default Vue.extend({
  name: 'KeyTable',
  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    items: {
      type: Object as () => KeyDetail[],
      default() {
        return [];
      },
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      headers: keyTableHeaders,
    };
  },
});
</script>

<style scoped></style>
