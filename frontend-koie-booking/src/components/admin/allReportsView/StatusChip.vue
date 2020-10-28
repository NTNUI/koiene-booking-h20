<template>
  <v-chip :color="color" text-color="white">{{ text }}</v-chip>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'StatusChip',
  props: {
    text: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'tomt',
    },
  },
});
</script>
