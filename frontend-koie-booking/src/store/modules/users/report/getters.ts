import { GetterTree } from 'vuex';
import { ReportState, RootState } from '@/store/types';

export const getters: GetterTree<ReportState, RootState> = {
  hasBoatEquipment(state) {
    return (
      ['flåkoia', 'heinfjordstua', 'holmsåkoia', 'holvassgamma', 'mevasskoia', 'sonvasskoia', 'stakkslettbua'].indexOf(
        state.bookingInfo.koie
      ) !== -1
    );
  },
};
