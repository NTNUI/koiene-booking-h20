import { MutationTree } from 'vuex';
import { BookingState, Guest, BookingInfo } from '../../../types';

export const mutations: MutationTree<BookingState> = {
  setDateTo(state, dateTo: string) {
    state.dateTo = dateTo;
  },
  setDateFrom(state, dateFrom: string) {
    state.dateFrom = dateFrom;
  },
  setBeds(state, beds: number) {
    state.beds = beds;
  },
  setStep(state, step: number) {
    state.step = step;
  },
  setGuests(state, guests: Array<Guest>) {
    state.guests = guests;
  },
  setNumberOfMembers(state, members: number) {
    state.numberOfMembers = members;
  },
  setNumberOfNonMembers(state, members: number) {
    state.numberOfNonMembers = members;
  },
  setEdited(state, edited: boolean) {
    state.edited = edited;
  },
  setValidForm(state, valid: boolean) {
    state.validForm = valid;
  },
  setUnavailableDates(state, dates: []) {
    state.unavailableDates = dates;
  },
  setLoadingStatus(state, loading: boolean) {
    state.isLoading = loading;
  },
  setAvailableBeds(state, beds: number) {
    state.availableBeds = beds;
  },
  setNoDatesAvailable(state, datesAvailable: boolean) {
    state.noDatesAvailable = datesAvailable;
  },
  setBooking(state, booking: BookingInfo) {
    state.bookingData = booking;
  },
  setError(state, error: boolean) {
    state.error = error;
  },
  setPaymentConfirmed(state, payment: boolean) {
    state.paymentConfirmed = payment;
  }
};
