<template>
  <div>
    <v-chip :color="chipColor" text-color="white" @click="enableModal ? clickHandler : null">{{ chipText }}</v-chip>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'StatusChip',
  props: {
    enableModal: {
      type: Boolean,
      default: false,
    },
    chipText: {
      type: String,
      default: '',
    },
    chipColor: {
      type: String,
      default: 'tomt',
    },
  },
});
</script>
