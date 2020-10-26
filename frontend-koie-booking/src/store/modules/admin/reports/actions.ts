import { ActionTree } from 'vuex';
import { AdminReportsState, RootState } from '@/store/types';

import request from '@/service/request';
import { APIAdminBooking } from '@/types/admin/AdminBooking';
import { convertAPIBookingToKoieNameSlug, convertAPIReportToAdminReport } from './helpers';
import APIAdminReport from '@/types/admin/APIAdminReport';

export const actions: ActionTree<AdminReportsState, RootState> = {
  async MOUNT_CABINS({ commit }) {
    try {
      const res = await request({ url: '/koie/availability?days=0' });
      for (const cabin of res.koier as Array<APIAdminBooking>) {
        commit('setCabins', convertAPIBookingToKoieNameSlug(cabin));
      }
    } catch (e) {
      console.log(e);
    }
  },
  async MOUNT_REPORTS({ commit }) {
    commit('clearAllReports');
    const res = await request({ url: '/koie/reports/' });
    for (const report of res as APIAdminReport[]) {
      commit('setReport', convertAPIReportToAdminReport(report));
    }
  },
  async MOUNT_REPORTS_FOR_CABIN({ commit, dispatch }, payload: string) {
    if (!payload) {
      dispatch('MOUNT_REPORTS');
      return;
    }
    commit('clearAllReports');
    try {
      const res = await request({ url: '/koie/reports/' + payload });
      for (const report of res.reports as APIAdminReport[]) {
        commit('setReport', convertAPIReportToAdminReport(report));
      }
    } catch (e) {
      console.log(e);
    }
  },
};
