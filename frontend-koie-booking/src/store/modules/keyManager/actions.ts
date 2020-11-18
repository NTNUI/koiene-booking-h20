import { ActionTree } from 'vuex';
import { KeyManagerState, RootState } from '@/store/types';
import { APIKeyDetail } from '@/types/keyManager/KeyDetail';
import request from '@/service/request';
import { convertAPIKeyDetailToKeyDetail } from '@/store/modules/keyManager/helpers';
import dayjs from 'dayjs';

export const actions: ActionTree<KeyManagerState, RootState> = {
  async MOUNT_KEY_PICKUPS({ commit }) {
    commit('clearAllPickUpKeys');
    const arrivalDateStart = dayjs().format('YYYY-MM-DD');
    const arrivalDateEnd = dayjs()
      .add(2, 'day')
      .format('YYYY-MM-DD');
    try {
      const [startingInTwoDaysOrLess, notPickedUpInThePast] = await Promise.all([
        request({
          url:
            '/koie/sit?key_status=picked_up&arrival_date_start=' +
            arrivalDateStart +
            '&arrival_date_end=' +
            arrivalDateEnd,
        }),
        request({ url: '/koie/sit?key_status=not_picked_up&arrival_date_end=' + arrivalDateEnd }),
      ]);
      for (const keyDetail of startingInTwoDaysOrLess as Array<APIKeyDetail>) {
        commit('setPickUpKeys', convertAPIKeyDetailToKeyDetail(keyDetail));
      }
      for (const keyDetail of notPickedUpInThePast as Array<APIKeyDetail>) {
        commit('setPickUpKeys', convertAPIKeyDetailToKeyDetail(keyDetail));
      }
    } catch (e) {
      console.log(e);
    }
  },
  async MOUNT_KEY_DELIVERIES({ commit }) {
    commit('clearAllDeliveryKeys');
    const departureDateStart = dayjs().format('YYYY-MM-DD');
    const departureDateEnd = dayjs()
      .add(1, 'week')
      .format('YYYY-MM-DD');
    try {
      const [notDeliveredInThePast, endingInAWeekOrLess] = await Promise.all([
        request({ url: '/koie/sit?key_status=picked_up' }),
        request({
          url:
            '/koie/sit?key_status=picked_up&departure_date_start=' +
            departureDateStart +
            '&departure_date_end=' +
            departureDateEnd,
        }),
      ]);
      for (const keyDetail of notDeliveredInThePast as Array<APIKeyDetail>) {
        commit('setDeliveryKeys', convertAPIKeyDetailToKeyDetail(keyDetail));
      }
      for (const keyDetail of endingInAWeekOrLess as Array<APIKeyDetail>) {
        commit('setDeliveryKeys', convertAPIKeyDetailToKeyDetail(keyDetail));
      }
    } catch (e) {
      console.log(e);
    }
  },
};
