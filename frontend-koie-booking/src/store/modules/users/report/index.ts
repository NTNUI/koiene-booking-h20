import Vue from 'vue';
import Vuex, { Module } from 'vuex';
import { mutations } from './mutations';
import { actions } from './actions';
import { getters } from './getters';
import { ReportState, RootState } from '@/store/types';

Vue.use(Vuex);

export const state: ReportState = {
  validForm: true,
  edited: false,
  isLoading: false,
  error: false,
  step: 1,
  reportData: {
    id: 0,
    booking_id: 0,
    firewood: 0,
    chopped_up_wood: 0,
    smoke_detector_is_working: true,
    gas_is_full: true,
    gas_burner_primus: 0,
    axe: 0,
    hammer: 0,
    saw: 0,
    saw_blade: 0,
    saw_bench: 0,
    spade: 0,
    kerosene_lamp: 0,
    detergent: 0,
    dishware: 0,
    cookware: 0,
    cabin_book: 0,
    candle_holders: 0,
    fire_blanket: 0,
    fire_extinguisher: 0,
    other_faults: '',
    boat_status: 0,
    canoe_status: 0,
    life_jackets_status: 0,
    feedback: ''
  }
};
const namespaced: boolean = true;

export const report: Module<ReportState, RootState> = {
  namespaced,
  state,
  actions,
  mutations,
  getters
};
