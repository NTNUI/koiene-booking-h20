import Vue from 'vue';
import store from '@/store';
import axios from 'axios';
import { ReportData } from '@/store/types';

export const actions = {
  CREATE_REPORT: (ctx: any, reportData: ReportData): any => {
    const headers = { 'content-type': 'application/json', Authorization: '' };
    const authToken = store.getters['auth/getToken'];
    if (authToken) {
      headers.Authorization = `Bearer ${authToken}`;
    }
    ctx.commit('setLoadingStatus', true);
    axios
      .post(Vue.prototype.$apiUrl + `/koie/reports/${reportData.booking_id}`, reportData, { headers })
      .then((res) => {
        ctx.commit('setLoadingStatus', false);
      })
      .catch((error) => {
        ctx.commit('setError', true);
        ctx.commit('setLoadingStatus', false);
        console.log(error);
        throw new Error(`API ${error}`);
      });
  }
};

export default actions;
