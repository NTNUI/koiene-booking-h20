<template>
  <ErrorCard v-if="apiError" />
  <LoadingSpinner v-else-if="isLoading" />
  <v-layout v-else :class="$style.container" :dark="true">
    <h1>Step 3</h1>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'ReportThirdStep'
});
</script>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: column;
}
</style>
