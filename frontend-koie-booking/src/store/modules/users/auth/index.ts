import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { RootState, AuthState } from '@/store/types';

export const state: AuthState = {
  isAdmin: true, // TODO: Change this to false when we have a proper admin user
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
