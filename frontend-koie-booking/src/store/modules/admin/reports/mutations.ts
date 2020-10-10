import { MutationTree } from 'vuex';
import { AdminReportsState } from '@/store/types';

export const mutations: MutationTree<AdminReportsState> = {
  setChosenCabin(state, cabin: string) {
    state.chosenCabin = cabin;
  },
  setExpanded(state, expanded: boolean) {
    state.expanded = expanded;
  },
};
