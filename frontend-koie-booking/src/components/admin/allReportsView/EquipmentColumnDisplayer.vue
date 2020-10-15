<template>
  <v-row justify="center">
    <v-chip class="mx-1" :color="$scssVars.globalColorGreenStrong" @click="clickHandler"> {{ ok.length }} </v-chip>
    <v-chip class="mx-1" :color="$scssVars.globalColorGrey" @click="clickHandler"> {{ notSure.length }} </v-chip>
    <v-chip class="mx-1" :color="$scssVars.globalColorRedStrong" @click="clickHandler"> {{ notOk.length }} </v-chip>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'EquipmentColumnDisplayer',
  props: {
    clickHandler: {
      type: Function,
      default: () => null,
    },
    notOk: {
      type: Array,
      default() {
        return [];
      },
    },
    notSure: {
      type: Array,
      default() {
        return [];
      },
    },
    ok: {
      type: Array,
      default() {
        return [];
      },
    },
  },
});
</script>

<style scoped></style>
