import Vue from 'vue';
import Vuex, { Module } from 'vuex';
import { mutations } from './mutations';
import { actions } from './actions';
import { getters } from './getters';
import { BookingState, RootState, Guest } from '../../../types';

Vue.use(Vuex);

export const state: BookingState = {
  isLoading: false,
  dateFrom: '',
  dateTo: '',
  beds: 1,
  step: 1,
  guests: [],
  numberOfMembers: 0,
  numberOfNonMembers: 0,
  edited: false,
  validForm: true,
  unavailableDates: [],
  availableBeds: 0,
  noDatesAvailable: false,
  error: false,
  bookingData: {
    id: 0,
    user: 0,
    koie: '',
    price: 0,
    booking_transaction_id: '',
    from_date: '',
    to_date: '',
    guests_member: 0,
    guests_not_member: 0
  },
  paymentConfirmed: false
};
const namespaced: boolean = true;

export const booking: Module<BookingState, RootState> = {
  namespaced,
  state,
  actions,
  mutations,
  getters
};
