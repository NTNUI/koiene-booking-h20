<template>
  <v-dialog :value="showModal" persistent width="500" @click:outside="closeModal">
    <v-card>
      <v-card-title class="headline">
        {{ title }}
      </v-card-title>
      <v-card-text>
        <slot name="modalContext" />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="closeModal">
          Lukk
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'ReportDetailModal',
  props: {
    showModal: {
      type: Boolean,
      default: true,
    },
    closeModal: {
      type: Function,
      default() {
        return null;
      },
    },
    title: {
      type: String,
      default: '',
    },
  },
});
</script>

<style scoped></style>
