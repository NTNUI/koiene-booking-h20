import { ActionTree } from 'vuex';
import { AuthState, RootState } from '@/store/types';

export const actions: ActionTree<AuthState, RootState> = {
  obtainToken({ commit }, data) {
    commit('setToken', data);
    commit('setAdmin', true); // TODO: Remove this when the backend returns admin metadata
  },
  refreshToken({ commit }, data) {
    commit('updateToken', data);
  },
  deleteTokens({ commit }) {
    commit('removeToken');
  }
};
