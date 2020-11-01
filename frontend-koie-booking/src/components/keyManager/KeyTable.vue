<template>
  <div id="dataTable">
    <v-row justify="center" style="margin: 5px 10px 20px">
      <span style="font-weight: bold">{{ title }}</span> <v-spacer />
      <span>{{ description }}</span>
    </v-row>
    <v-data-table
      style="width: 100%; background-color: rgba(0,0,0,0)"
      :headers="headers"
      :items="items"
      :loading="loading"
      :search="search"
      loading-text="Henter inn status for nøkler"
      no-data-text="Det skjedde noe feil da vi prøvde å hente status for nøkler"
      height="100%"
    >
      <template v-slot:top>
        <v-text-field v-model="search" label="Søk på e-post, koie eller dato" class="mx-4" />
      </template>
      <template v-slot:item="row">
        <slot name="row" :row="row" />
      </template>
    </v-data-table>
  </div>
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
      type: Array as () => KeyDetail[],
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
      search: '',
    };
  },
});
</script>

<style scoped lang="scss">
#dataTable {
  height: 60vh;
  max-height: 60vh;
  background-color: black;
  border-left: 3px solid #4caf50;
  padding: 10px;
  border-radius: 5px;
}
</style>
