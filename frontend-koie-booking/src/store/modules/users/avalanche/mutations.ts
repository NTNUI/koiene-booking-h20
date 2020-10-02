import { MutationTree } from 'vuex';
import { AvalancheState } from '@/store/types';

export const mutations: MutationTree<AvalancheState> = {
  setWarningLevels(state, warningLevels: []) {
    state.warningLevels = warningLevels;
  },
  disableBooking(state, disable: boolean) {
    state.disableBooking = disable;
  },
  setWarningData(state, data: []) {
    state.warningData = data;
  },
};
