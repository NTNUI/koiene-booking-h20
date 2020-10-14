<template>
  <div @click="enableModal ? clickHandler : null">{{ text }}</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'StringDisplayer',
  props: {
    text: {
      type: String,
      default: '',
    },
    enableModal: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
