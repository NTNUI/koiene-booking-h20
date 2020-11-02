import { ActionTree } from 'vuex';
import { APIAdminBooking } from '@/types/admin/AdminBooking';

import { AdminBookingsState, RootState } from '@/store/types';
import { convertAPIBookingToAdminBooking } from '@/store/modules/admin/bookings/helpers';
import request from '@/service/request';

export const actions: ActionTree<AdminBookingsState, RootState> = {
  async MOUNT_CABINS_WITH_BOOKINGS({ commit }, payload: { startDate: string; endDate: string }) {
    if (!payload) return;
    commit('setLoading', true);
    commit('clearAllBookings');
    try {
      const res = await request({
        url: '/koie/availability/range?from_date=' + payload.startDate + '&to_date=' + payload.endDate,
      });
      for (const cabin of res.koier as Array<APIAdminBooking>) {
        commit('setCabinWithBooking', convertAPIBookingToAdminBooking(cabin));
      }
    } catch (e) {
      console.log(e);
    }
    commit('setLoading', false);
  },
};
