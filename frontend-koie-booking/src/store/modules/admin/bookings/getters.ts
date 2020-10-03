import { GetterTree } from 'vuex';
import { AdminBookingsState, RootState } from '@/store/types';
import AdminBooking, { AdminBookingDictionary } from '@/types/admin/AdminBooking';

export const getters: GetterTree<AdminBookingsState, RootState> = {
  getCabinsWithBookingsArray(state): Array<AdminBooking> {
    return Object.values(state.cabinsWithBookings);
  },
  getCabinsWithBookings(state): AdminBookingDictionary {
    return state.cabinsWithBookings;
  },
  getStartDate(state): string {
    return state.startDate;
  },
};
