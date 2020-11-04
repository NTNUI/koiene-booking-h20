import { ActionTree } from 'vuex';
import { AuthState, RootState } from '@/store/types';

export const actions: ActionTree<AuthState, RootState> = {
  obtainToken({ commit }, data) {
    commit('setToken', data);
  },
  refreshToken({ commit }, data) {
    commit('updateToken', data);
  },
  deleteTokens({ commit }) {
    commit('logOut');
    commit('removeToken');
  },
};
