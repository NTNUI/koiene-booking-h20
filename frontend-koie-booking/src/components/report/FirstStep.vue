<template>
  <v-layout :class="$style.container" :dark="true">
    <h1 :class="$style.heading">{{ $t('report.reportTitle') }}</h1>
    <v-layout :class="$style.separator">
      <v-layout class="px-4">
        <p>{{ $t('report.reportDescription') }}</p>
      </v-layout>
      <v-layout class="px-4">
        <p>
          {{ $t('report.reportYourTripTo') }}
          <span :class="$style.capitalize">{{ koie }}</span>
          {{ $t('report.reportFrom') }}
          {{ fromDate }}
          {{ $t('report.reportTo') }}
          {{ toDate }}.
        </p>
      </v-layout>
    </v-layout>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import store from '@/store/index';

export default Vue.extend({
  name: 'ReportFirstStep',
  computed: {
    koie() {
      return store.getters['report/getBookingInfoKoie'];
    },
    fromDate() {
      return store.getters['report/getBookingInfoFromDate'];
    },
    toDate() {
      return store.getters['report/getBookingInfoToDate'];
    },
  },
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
.capitalize {
  text-transform: capitalize;
}
</style>
