<template>
  <div
    style="text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 150px"
    @click="clickHandler"
  >
    {{ text }}
  </div>
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
    clickHandler: {
      type: Function,
      default: () => null,
    },
  },
});
</script>
