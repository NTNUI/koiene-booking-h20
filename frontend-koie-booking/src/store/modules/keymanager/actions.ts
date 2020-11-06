import { ActionTree } from 'vuex';
import { KeyDetailsState, RootState } from '@/store/types';
import { APIKeyDetail } from '@/types/keyManager/KeyDetail';
import dayjs from 'dayjs';
import request from '@/service/request';
import { convertAPIKeyDetailToKeyDetail } from '@/store/modules/keymanager/helpers'

export const actions: ActionTree<KeyDetailsState, RootState> = {
  async MOUNT_KEY_PICKUPS({ commit }) {
    commit('clearAllPickUpKeys');
    const arrivalDateEnd: string = dayjs()
      .add(2, 'day')
      .format('YYYY-MM-DD');
    try {
      const res = await request({ url: '/koie/sit?key_status=not_picked_up&arrival_date_end=' + arrivalDateEnd + '/' });
      for (const keyDetail of res as Array<APIKeyDetail>) {
        commit('setPickUpKeys', convertAPIKeyDetailToKeyDetail(keyDetail));
      }
    } catch (e) {
      console.log(e);
    }
  },
  async MOUNT_KEY_DELIVERIES({ commit }, ) {
    commit('clearAllDeliveryKeys');
    try {
      // for now show all keys that have not been delivered here, can include date fuckery later
      const res = await request({ url: '/koie/sit?key_status=picked_up' });
      for (const keyDetail of res as Array<APIKeyDetail>) {
        commit('setDeliveryKeys', convertAPIKeyDetailToKeyDetail(keyDetail));
      }
    } catch (e) {
      console.log(e);
    }
  },
};
