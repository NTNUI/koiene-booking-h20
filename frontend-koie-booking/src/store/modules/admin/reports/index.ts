import { AdminReportsState, RootState } from '@/store/types';
import { Module } from 'vuex';
import { getters } from '@/store/modules/admin/reports/getters';
import { actions } from '@/store/modules/admin/reports/actions';
import { mutations } from '@/store/modules/admin/reports/mutations';

export const state: AdminReportsState = {
  chosenCabin: '',
  cabins: {},
  expanded: false,
};

const namespaced = true;

export const adminReports: Module<AdminReportsState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
