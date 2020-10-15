<template>
  <v-col cols="11">
    <v-row justify="center">
      <h5 style="text-align: center;">Filtrer etter koie</h5>
    </v-row>
    <v-row justify="center">
      <v-btn text icon @click="setExpanded(!expanded)">
        <v-icon v-if="!expanded">mdi-arrow-down</v-icon>
        <v-icon v-else>mdi-arrow-up</v-icon>
      </v-btn>
    </v-row>
    <v-row v-show="expanded">
      <v-expand-transition>
        <v-row v-show="expanded" class="shrink d-flex flex-wrap justify-center">
          <template v-for="cabin in cabins">
            <v-chip
              v-if="chosenCabin !== cabin.slug"
              :key="cabin.slug"
              color="blue-grey darken-4"
              class="ma-1"
              @click="setChosenCabin(cabin.slug)"
              >{{ cabin.name }}</v-chip
            >
            <v-chip v-else :key="cabin.slug" color="primary" class="ma-1" @click="setChosenCabin('')">{{
              cabin.name
            }}</v-chip>
          </template>
        </v-row>
      </v-expand-transition>
    </v-row>
  </v-col>
</template>

<script lang="ts">
import Vue from 'vue';
import { sortObjectByKey } from '../../../utils/objects';

export default Vue.extend({
  name: 'ReportsFilter',
  computed: {
    cabins() {
      const unordered = this.$store.state.adminReports.cabins;
      const ordered = sortObjectByKey(unordered);
      return ordered;
    },
    chosenCabin() {
      return this.$store.state.adminReports.chosenCabin;
    },
    expanded() {
      return this.$store.state.adminReports.expanded;
    },
  },
  mounted() {
    this.mountCabins();
  },
  methods: {
    setChosenCabin(cabin: string) {
      this.$store.commit('adminReports/setChosenCabin', cabin);
      this.$store.dispatch('adminReports/MOUNT_REPORTS_FOR_CABIN', cabin);
    },
    setExpanded(expand: boolean) {
      this.$store.commit('adminReports/setExpanded', expand);
    },
    mountCabins() {
      this.$store.dispatch('adminReports/MOUNT_CABINS');
    },
  },
});
</script>

<style scoped></style>
