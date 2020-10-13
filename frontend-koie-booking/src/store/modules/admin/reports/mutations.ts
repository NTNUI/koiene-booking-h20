import { MutationTree } from 'vuex';
import { AdminReportsState } from '@/store/types';
import { KoieNameSlug } from '@/types/admin/AdminReports';
import Vue from 'vue';

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
};
