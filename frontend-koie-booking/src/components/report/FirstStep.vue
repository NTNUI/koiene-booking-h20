<template>
  <v-layout :class="$style.container" :dark="true">
    <h1 :class="$style.heading">{{ $t('report.reportTitle') }}</h1>
    <v-layout :class="$style.separator">
      <v-layout class="px-4">
        <p>{{ $t('report.reportDescription') }}</p>
      </v-layout>
      <v-layout class="px-4">
        <p>
          {{ $t('report.reportBookingInfo1') }}
          <span :class="$style.capitalize">{{ this.$store.state.report.bookingInfo.koie }}</span>
          {{ $t('report.reportBookingInfo2') }}
          {{ this.$store.state.report.bookingInfo.from_date }}
          {{ $t('report.reportBookingInfo3') }}
          {{ this.$store.state.report.bookingInfo.to_date }}.
        </p>
      </v-layout>
    </v-layout>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ReportFirstStep',
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
