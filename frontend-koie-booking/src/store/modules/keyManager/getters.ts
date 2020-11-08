import { GetterTree } from 'vuex';
import { KeyManagerState, RootState } from '@/store/types';
import KeyDetail from '@/types/keyManager/KeyDetail';

export const getters: GetterTree<KeyManagerState, RootState> = {
  getPickUpKeysArray(state): Array<KeyDetail> {
    return Object.values(state.pickUpKeys);
  },
  getDeliveryKeysArray(state): Array<KeyDetail> {
    return Object.values(state.deliveryKeys);
  },
};
