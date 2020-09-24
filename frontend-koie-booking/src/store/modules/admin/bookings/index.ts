import { AdminBookingsState, AuthState, RootState } from '@/store/types';
import { Module } from 'vuex';
import { getters } from '@/store/modules/admin/bookings/getters';
import { actions } from '@/store/modules/admin/bookings/actions';
import { mutations } from '@/store/modules/admin/bookings/mutations';

export const state: AdminBookingsState = {
  cabinsWithBookings: {}
};

const namespaced = true;

export const adminBookings: Module<AdminBookingsState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
