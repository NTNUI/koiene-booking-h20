import { MutationTree } from 'vuex';
import { KeyDetailsState } from '@/store/types';
import Vue from 'vue';
import KeyDetail from '@/types/keyManager/KeyDetail';

export const mutations: MutationTree<KeyDetailsState> = {
  setPickUpKeys(state, keyDetail: KeyDetail) {
    Vue.set(state.pickUpKeys, keyDetail.uuid, keyDetail);
  },
  clearAllPickUpKeys(state) {
    state.pickUpKeys = {};
  },
  setDeliveryKeys(state, keyDetail: KeyDetail) {
    Vue.set(state.deliveryKeys, keyDetail.uuid, keyDetail);
  },
  clearAllDeliveryKeys(state) {
    state.deliveryKeys = {};
  },
};
