import Vue from 'vue';
import store from '@/store';
import axios from 'axios';
import { ReportData } from '@/store/types';
import { renameKey } from '@/utils/objects';

export const actions = {
  CREATE_REPORT: (ctx: any, reportData: ReportData): any => {
    const headers = { 'content-type': 'application/json', Authorization: '' };
    const authToken = store.getters['auth/getToken'];
    if (authToken) {
      headers.Authorization = `Bearer ${authToken}`;
    }
    ctx.commit('setLoadingStatus', true);
    axios
      .post(Vue.prototype.$apiUrl + `/koie/reports/${reportData.booking_uuid}`, reportData, { headers })
      .then((res) => {
        ctx.commit('setLoadingStatus', false);
      })
      .catch((error) => {
        ctx.commit('setError', true);
        ctx.commit('setLoadingStatus', false);
        throw new Error(`API ${error}`);
      });
  },
  FETCH_BOOKING: async (ctx: any, bookingID: string): Promise<void> => {
    const headers = { 'content-type': 'application/json', Authorization: '' };
    const authToken = store.getters['auth/getToken'];
    if (authToken) {
      headers.Authorization = `Bearer ${authToken}`;
    }
    ctx.commit('setLoadingStatus', true);
    try {
      const res = await axios.get(Vue.prototype.$apiUrl + `/koie/booking/${bookingID}`, { headers });
      ctx.commit('setLoadingStatus', false);
      let booking = renameKey(res.data.booking, 'arrival_date', 'from_date');
      booking = renameKey(booking, 'departure_date', 'to_date');
      ctx.commit('setBooking', booking);
    } catch (error) {
      ctx.commit('setError', true);
      ctx.commit('setLoadingStatus', false);
      throw new Error(`API ${error}`);
    }
  },
};

export default actions;
