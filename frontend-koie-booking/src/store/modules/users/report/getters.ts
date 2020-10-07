import { GetterTree } from 'vuex';
import { ReportState, RootState } from '@/store/types';

export const getters: GetterTree<ReportState, RootState> = {
  getReport(state) {
    return state;
  },
  getBookingInfoKoie(state) {
    return state.bookingInfo.koie;
  },
  getBookingInfoFromDate(state) {
    return state.bookingInfo.from_date;
  },
  getBookingInfoToDate(state) {
    return state.bookingInfo.to_date;
  },
};
