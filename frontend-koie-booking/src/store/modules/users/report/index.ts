import Vue from 'vue';
import Vuex, { Module } from 'vuex';
import { mutations } from './mutations';
import { actions } from './actions';
import { getters } from './getters';
import { ReportState, RootState } from '../../../types';

Vue.use(Vuex);

export const state: ReportState = {
  validForm: true,
  edited: false,
  isLoading: false,
  error: false,
  step: 1
};
const namespaced: boolean = true;

export const report: Module<ReportState, RootState> = {
  namespaced,
  state,
  actions,
  mutations,
  getters
};
