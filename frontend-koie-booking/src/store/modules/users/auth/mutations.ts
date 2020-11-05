import { MutationTree } from 'vuex';
import { AuthState } from '@/store/types';
import dayjs from 'dayjs';

const setAccessToken = (state: any, newToken: any) => {
  const tokenExpires = dayjs()
    .add(5, 'minute')
    .unix();
  localStorage.setItem('a', newToken.access);
  localStorage.setItem('t-date', `${new Date()}`);
  localStorage.setItem('t-expires', String(tokenExpires));
  state.tokens.expires = tokenExpires;
  state.tokens.access = newToken.access;
};

export const mutations: MutationTree<AuthState> = {
  setAdmin(state, payload: boolean) {
    state.isAdmin = payload;
  },
  setKeyManager(state, payload: boolean) {
    state.isKeyManager = payload;
  },
  setToken(state, newToken) {
    setAccessToken(state, newToken);
    localStorage.setItem('r', newToken.refresh);
    state.tokens.refresh = newToken.refresh;
  },
  setTokenExpires(state, tokenExpires: number) {
    state.tokens.expires = tokenExpires;
  },

  updateToken(state, newToken) {
    setAccessToken(state, newToken);
  },

  logOut(state) {
    state.isAdmin = false;
    state.isKeyManager = false;
  },

  removeToken(state) {
    localStorage.removeItem('a');
    localStorage.removeItem('r');
    localStorage.removeItem('t-date');
    localStorage.removeItem('email');
    localStorage.removeItem('user_id');
    localStorage.removeItem('t-expires');
    state.tokens.access = null;
    state.tokens.refresh = null;
    state.tokens.expires = null;
  },
};
