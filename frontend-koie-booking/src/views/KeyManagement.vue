<template>
  <KeyManagerOverview style="padding: 10px" />
</template>

<script lang="ts">
import Vue from 'vue';
import KeyManagerOverview from '@/components/keyManager/KeyManagerOverview.vue';

export default Vue.extend({
  name: 'KeyManagement',
  components: { KeyManagerOverview },
});
</script>

<style scoped></style>
