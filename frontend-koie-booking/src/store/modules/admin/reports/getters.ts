import { GetterTree } from 'vuex';
import { AdminReportsState, RootState } from '@/store/types';
import AdminReport from '@/types/admin/AdminReport';

export const getters: GetterTree<AdminReportsState, RootState> = {
  getReportArray(state): Array<AdminReport> {
    return Object.values(state.reports);
  },
};
