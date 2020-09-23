import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { RootState, AuthState } from '@/store/types';

export const state: AuthState = {
  isAdmin: true, // I simply copied Jesper here, dont know if its permanent or just to get around testing issues
  tokens: {
    access: localStorage.getItem('a'),
    refresh: localStorage.getItem('r')
  }
};

const namespaced: boolean = true;

export const auth: Module<AuthState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
