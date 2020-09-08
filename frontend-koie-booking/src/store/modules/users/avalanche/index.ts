import Vue from 'vue';
import Vuex, { Module } from 'vuex';
import { mutations } from './mutations';
import { actions } from './actions';
import { AvalancheState, RootState } from '../../../types';

Vue.use(Vuex);

export const state: AvalancheState = {
  warningLevels: [],
  disableBooking: false,
  warningData: [{ dangerLevel: 0, validTo: '' }],
  koierToCheck: ['Kamtjønnkoia']
};

const namespaced: boolean = true;

export const avalanche: Module<AvalancheState, RootState> = {
  namespaced,
  state,
  actions,
  mutations
};
