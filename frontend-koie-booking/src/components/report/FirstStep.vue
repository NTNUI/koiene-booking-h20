<template>
  <ErrorCard v-if="apiError" />
  <LoadingSpinner v-else-if="isLoading" />
  <v-layout v-else :class="$style.container" :dark="true">
    <h1 :class="$style.heading">{{ $t('report.reportTitle') }}</h1>
    <v-layout :class="$style.separator">
      <v-layout class="px-4">
        <p>{{ $t('report.reportDescription') }}</p>
      </v-layout>
    </v-layout>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import ErrorCard from '@/components/ErrorCard.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

export default Vue.extend({
  name: 'ReportFirstStep',
  components: {
    ErrorCard,
    LoadingSpinner
  },
  computed: {
    apiError(): boolean {
      return this.$store.state.report.error;
    },
    isLoading(): boolean {
      return this.$store.state.report.isLoading;
    }
  }
});
</script>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: column;
}
.heading {
  margin-top: 20px;
  align-self: center;
}
.separator {
  border-left: solid 4px;
  border-color: #2f3a50;
  display: flex;
  flex-direction: column;
  margin-top: 24px;
}
.separator > h3 {
  padding: 16px;
}
</style>
