<template>
  <div @click="enableModal ? clickHandler : null">
    <StatusChip :chipText="text" :chipColor="color" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import StatusChip from '@/components/admin/reports/StatusChip.vue';
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
      default: 'grey',
    },
  },
});
</script>

<style scoped></style>
