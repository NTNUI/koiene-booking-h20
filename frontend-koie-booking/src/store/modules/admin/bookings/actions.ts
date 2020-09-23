import { ActionTree } from 'vuex';
import getKoiene from '../../../../../__mocks__/koiene';

import { AdminBookingsState, RootState } from '@/store/types';

export const actions: ActionTree<AdminBookingsState, RootState> = {
  async mountCabinsWithBookings({ commit }, payload: { startDate: string; endDate: string }) {
    // TODO: Replace this mockcall with a real call
    const cabins = await getKoiene();
    for (const cabin of Object.values(cabins)) {
      commit('setCabinWithBooking', cabin);
    }
  }
};
