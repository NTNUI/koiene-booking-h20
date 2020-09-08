import { GetterTree } from 'vuex';
import { BookingState, RootState } from '@/store/types';

export const getters: GetterTree<BookingState, RootState> = {
  getBooking(state) {
    return state;
  }
};
