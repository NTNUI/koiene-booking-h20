<template>
  <ErrorCard v-if="apiError" />
  <LoadingSpinner v-else-if="isLoading" />
  <v-layout v-else :class="$style.container" :dark="true">
    <h1>Step 1</h1>
  </v-layout>
</template>

<script lang="ts">
import ErrorCard from '../components/ErrorCard.vue';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import Vue from 'vue';
import BookingSecondStepVue from './BookingSecondStep.vue';

export default Vue.extend({
  name: 'ReportFirstStep'
});
</script>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: column;
}
</style>
