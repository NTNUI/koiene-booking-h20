import { GetterTree } from 'vuex';
import { KeyDetailsState, RootState } from '@/store/types';
import KeyDetail from '@/types/keyManager/KeyDetail';

export const getters: GetterTree<KeyDetailsState, RootState> = {
  // FIXME: Not 100% sure if this should be array, a KeyDetailDictionary could be the correct type
  getPickUpKeysArray(state): Array<KeyDetail> {
    console.log("getting PickUpKeysArray")
    return Object.values(state.pickUpKeys);
  },
  // Same as above ^
  getDeliveryKeysArray(state): Array<KeyDetail> {
    console.log("getting DeliveryKeysArray")
    return Object.values(state.deliveryKeys);
  },
};
