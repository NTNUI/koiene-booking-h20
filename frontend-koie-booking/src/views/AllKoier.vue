<template>
  <ErrorCard v-if="error" />
  <LoadingSpinner v-else-if="isLoading" />
  <v-container v-else fill-height class="global-max-width pa-3">
    <v-row class="mx-auto">
      <v-col v-for="koie in koieData" :key="koie.name" class="mt-5" cols="12" sm="6" md="4">
        <v-card :title="koie.name" outlined class="global-card-outlined" @click="goToKoie">
          <v-img width="100%" height="200" :src="imgUrl(koie.name)"></v-img>
          <v-card-title>{{ koie.name }}</v-card-title>
          <v-card-subtitle>{{ koie.number_of_beds }} {{ $t('allKoier.beds') }} </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import ErrorCard from '../components/ErrorCard.vue';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import Vue from 'vue';
import { AllKoierData } from '../types/allKoier';

export default Vue.extend({
  name: 'AllKoier',
  components: {
    ErrorCard,
    LoadingSpinner,
  },
  data(): AllKoierData {
    return {
      koieTitle: '',
    };
  },
  computed: {
    error: function(): boolean {
      return this.$store.state.koie.error;
    },
    isLoading: function(): boolean {
      return this.$store.state.koie.isLoading;
    },
    koieData(): Array<any> {
      return this.$store.state.koie.allKoier;
    },
  },
  created: function() {
    this.$store.dispatch('koie/FETCH_ALL_KOIER');
    this.$store.dispatch('avalanche/DISABLE_BOOKING', false);
    if (this.$store.state.booking.beds === 0) {
      this.$store.dispatch('booking/SET_BEDS', 1);
      this.$store.dispatch('booking/SET_AVAILABLE_BEDS', 10);
    }
  },
  methods: {
    goToKoie(event: any) {
      this.koieTitle = event.currentTarget.title.toLowerCase();
      this.$router.push(`/koie/${this.koieTitle}`);
      this.getKoieData(this.koieTitle);
    },
    imgUrl(name: string): string {
      return '/koie_pictures/' + name.toLowerCase() + '1.jpg';
    },
    getKoieData(koieName: string) {
      this.$store.dispatch('koie/FETCH_DATA', koieName);
    },
  },
});
</script>

<style lang="scss"></style>
