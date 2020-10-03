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
    firewood: 2,
    chopped_up_wood: 2,
    smoke_detector_is_working: true,
    gas_is_full: true,
    gas_burner_primus: 1,
    axe: 1,
    hammer: 1,
    saw: 1,
    saw_blade: 1,
    saw_bench: 1,
    spade: 1,
    kerosene_lamp: 1,
    detergent: 1,
    dishware: 1,
    cookware: 1,
    cabin_book: 1,
    candle_holders: 1,
    fire_blanket: 1,
    fire_extinguisher: 1,
    other_faults: '',
    boat_status: 0,
    canoe_status: 0,
    life_jackets_status: 0,
    feedback: '',
  },
};
const namespaced: boolean = true;

export const report: Module<ReportState, RootState> = {
  namespaced,
  state,
  actions,
  mutations,
  getters,
};
