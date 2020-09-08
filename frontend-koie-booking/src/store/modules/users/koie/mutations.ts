import { MutationTree } from 'vuex';
import { KoieState, Koie } from '../../../types';
import { state } from '.';

export const mutations: MutationTree<KoieState> = {
  setLoadingStatus(state, payload) {
    state.isLoading = payload;
  },
  setKoieData(state, information: any) {
    state.koieData = information.koie;
  },
  setError(state) {
    state.error = !state.error;
  },
  setAllKoier(state, payload) {
    state.allKoier = payload;
  }
};

export default mutations;
