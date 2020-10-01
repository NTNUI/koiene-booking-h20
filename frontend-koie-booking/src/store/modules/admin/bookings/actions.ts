import { ActionTree } from 'vuex';
import axios from 'axios';
import { APIAdminBooking } from '@/types/admin/AdminBooking';

import { AdminBookingsState, RootState } from '@/store/types';
import Vue from 'vue';
import { convertAPIBookingToAdminBooking } from '@/store/modules/admin/bookings/helpers';

export const actions: ActionTree<AdminBookingsState, RootState> = {
  async MOUNT_CABINS_WITH_BOOKINGS({ commit }, payload: { startDate: string; endDate: string }) {
    if (!payload) return;
    try {
      const res = await axios.get(
        Vue.prototype.$apiUrl +
          '/koie/availability/range?from_date=' +
          payload.startDate +
          '&to_date=' +
          payload.endDate
      );
      for (const cabin of res.data.koier as Array<APIAdminBooking>) {
        commit('setCabinWithBooking', convertAPIBookingToAdminBooking(cabin));
      }
    } catch (e) {
      console.log(e);
    }
  }
};
