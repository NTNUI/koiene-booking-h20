import { MutationTree } from 'vuex';
import { AuthState } from '@/store/types';

const setAccessToken = (state: any, newToken: any) => {
  localStorage.setItem('a', newToken.access);
  localStorage.setItem('t-date', `${new Date()}`);
  state.tokens.access = newToken.access;
};

export const mutations: MutationTree<AuthState> = {
  setToken(state, newToken) {
    setAccessToken(state, newToken);
    localStorage.setItem('r', newToken.refresh);
    state.tokens.refresh = newToken.refresh;
  },

  updateToken(state, newToken) {
    setAccessToken(state, newToken);
  },

  removeToken(state) {
    localStorage.removeItem('a');
    localStorage.removeItem('r');
    localStorage.removeItem('t-date');
    localStorage.removeItem('email');
    localStorage.removeItem('user_id');
    state.tokens.access = null;
    state.tokens.refresh = null;
  }
};
