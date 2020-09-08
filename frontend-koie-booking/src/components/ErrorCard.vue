<template>
  <v-container fill-height>
    <v-container class="global-max-width">
      <v-row class="mx-auto">
        <v-col align="center" class="mt-5" cols="12" lg="12" sm="12" md="12">
          <v-alert
            border="right"
            colored-border
            type="error"
            elevation="2"
            :tile="true"
            :class="$style.infoCard"
            :light="true"
          >
            <h3>{{ $t('koie.errorMsg') }}</h3>
            <p>{{ $t('koie.errorInstruction') }}</p>
          </v-alert>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({ name: 'ErrorCard' });
</script>

<style lang="scss" module>
.infoCard {
  padding: 10px;
  margin: 10px;
}
</style>
