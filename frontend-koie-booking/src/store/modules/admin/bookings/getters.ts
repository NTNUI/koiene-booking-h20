import { GetterTree } from 'vuex';
import { AdminBookingsState, RootState } from '@/store/types';
import { AdminBookingDictionary } from '@/types/admin/AdminBooking';

export const getters: GetterTree<AdminBookingsState, RootState> = {
  getCabinsWithBookings(state): AdminBookingDictionary {
    return state.cabinsWithBookings;
  }
};
