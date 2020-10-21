<template>
  <div @click="enableModal ? clickHandler : null">
    <StatusChip :chip-text="text" :chip-color="color" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import StatusChip from '@/components/admin/allReportsView/StatusChip.vue';
import scssVars from '@/styles/variables.scss';

export default Vue.extend({
  name: 'Reports',
  components: { StatusChip },
  props: {
    text: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: scssVars.globalColorGrey,
    },
  },
});
</script>

<style scoped></style>
