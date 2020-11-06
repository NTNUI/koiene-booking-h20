import { KeyManagerState, RootState } from '@/store/types';
import { Module } from 'vuex';
import { getters } from '@/store/modules/keymanager/getters';
import { actions } from '@/store/modules/keymanager/actions';
import { mutations } from '@/store/modules/keymanager/mutations';

export const state: KeyManagerState = {
  pickUpKeys: {},
  deliveryKeys: {},
};

const namespaced = true;

export const keyManager: Module<KeyManagerState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
