import { AdminBookingsState, AuthState, RootState } from '@/store/types';
import { Module } from 'vuex';
import { getters } from '@/store/modules/admin/bookings/getters';
import { actions } from '@/store/modules/admin/bookings/actions';
import { mutations } from '@/store/modules/admin/bookings/mutations';
import dayjs from 'dayjs';

export const state: AdminBookingsState = {
  cabinsWithBookings: {},
  startDate: dayjs().format('YYYY-MM-DD'),
  loading: false,
};

const namespaced = true;

export const adminBookings: Module<AdminBookingsState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
