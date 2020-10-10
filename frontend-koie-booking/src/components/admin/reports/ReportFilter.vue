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
              v-if="chosenCabin !== cabin.name"
              :key="cabin.name"
              color="blue-grey darken-4"
              class="ma-1"
              @click="setChosenCabin(cabin.name)"
              >{{ cabin.name }}</v-chip
            >
            <v-chip v-else :key="cabin.name" color="blue" class="ma-1" @click="setChosenCabin('')">{{
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

export default Vue.extend({
  name: 'ReportFilter',
  computed: {
    cabins() {
      return this.$store.state.koie.allKoier;
    },
    chosenCabin() {
      return this.$store.state.adminReports.chosenCabin;
    },
    expanded() {
      return this.$store.state.adminReports.expanded;
    },
  },
  created: function() {
    this.$store.dispatch('koie/FETCH_ALL_KOIER');
  },
  methods: {
    setChosenCabin(cabin: string) {
      this.$store.commit('adminReports/setChosenCabin', cabin);
    },
    setExpanded(expand: boolean) {
      this.$store.commit('adminReports/setExpanded', expand);
    },
  },
});
</script>

<style scoped></style>
