import { GetterTree } from 'vuex';
import { ReportState, RootState } from '@/store/types';

export const getters: GetterTree<ReportState, RootState> = {
  hasBoatEquipment(state) {
    return ['lyngli', 'vekvessætra'].indexOf(state.bookingInfo.koie) === -1;
  },
};
