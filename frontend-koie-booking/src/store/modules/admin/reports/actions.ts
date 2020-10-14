import { ActionTree } from 'vuex';
import Vue from 'vue';
import { AdminReportsState, RootState } from '@/store/types';
import axios from 'axios';

import { APIAdminBooking } from '@/types/admin/AdminBooking';
import { convertAPIBookingToKoieNameSlug } from './helpers';

export const actions: ActionTree<AdminReportsState, RootState> = {
  async MOUNT_CABINS({ commit }) {
    try {
      const res = await axios.get(Vue.prototype.$apiUrl + '/koie/availability?days=0');
      for (const cabin of res.data.koier as Array<APIAdminBooking>) {
        commit('setCabins', convertAPIBookingToKoieNameSlug(cabin));
      }
    } catch (e) {
      console.log(e);
    }
  },
};
