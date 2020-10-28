import { MutationTree } from 'vuex';
import { AdminReportsState } from '@/store/types';
import { KoieNameSlug } from '@/types/admin/AdminReports';
import Vue from 'vue';
import AdminReport from '@/types/admin/AdminReport';

export const mutations: MutationTree<AdminReportsState> = {
  setChosenCabin(state, cabin: string) {
    state.chosenCabin = cabin;
  },
  setExpanded(state, expanded: boolean) {
    state.expanded = expanded;
  },
  setCabins(state, cabin: KoieNameSlug) {
    Vue.set(state.cabins, cabin.slug, cabin);
  },
  setLoading(state, payload: boolean) {
    state.loading = payload;
  },
  setReport(state, report: AdminReport) {
    Vue.set(state.reports, report.id, report);
  },
  clearAllReports(state) {
    state.reports = {};
  },
};
