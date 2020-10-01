import { GetterTree } from 'vuex';
import { ReportState, RootState } from '@/store/types';

export const getters: GetterTree<ReportState, RootState> = {
  getReport(state) {
    return state;
  }
};
