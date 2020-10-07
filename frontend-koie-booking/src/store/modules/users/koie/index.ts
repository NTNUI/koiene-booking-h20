import Vue from 'vue';
import Vuex, { Module } from 'vuex';
import { KoieState, RootState } from '../../../types';
import { mutations } from './mutations';
import { actions } from './actions';
import { getters } from './getters';

Vue.use(Vuex);

export const state: KoieState = {
  currentLocale: 'en',
  isLoading: false,
  koieData: {
    location: {
      latitude: '',
      longitude: '',
      area: '',
      difficultyInfo_eng: '',
      difficultyInfo_nor: '',
      altitude: 0,
      terrain_eng: '',
      terrain_nor: '',
      map_pdf: '',
      kartblad: '',
    },
    description: {
      yr_link_eng: '',
      yr_link_nor: '',
      description_eng: '',
      description_nor: '',
      directions_eng: '',
      directions_nor: '',
      parking_eng: '',
      parking_nor: '',
    },
    beds_available_in_booking_window: [],
    name: '',
    number_of_beds: 0,
    booking_window: 14,
    price_member: 40,
    price_not_member: 80,
  },
  error: false,
  allKoier: [],
};

const namespaced: boolean = true;

export const koie: Module<KoieState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};

export default KoieState;
