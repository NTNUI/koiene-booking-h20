import axios from 'axios';
import { CreateBookingInfo, Guest } from '../../../types';
import Vue from 'vue';
import store from '@/store';
import request from '@/service/request';

export const actions = {
  SET_DATE_TO: (ctx: any, dateTo: string): any => {
    ctx.commit('setDateTo', dateTo);
  },
  SET_DATE_FROM: (ctx: any, dateFrom: string): any => {
    ctx.commit('setDateFrom', dateFrom);
  },
  SET_BEDS: (ctx: any, beds: number): any => {
    ctx.commit('setBeds', beds);
  },
  SET_STEP: (ctx: any, step: number): any => {
    ctx.commit('setStep', step);
  },
  SET_GUESTS: (ctx: any, guests: Array<Guest>): any => {
    ctx.commit('setGuests', guests);
    let numberOfMembers = 0;
    let numberOfNonMembers = 0;
    guests.forEach((guest) => {
      if (guest.isMember === true) {
        numberOfMembers += 1;
      } else {
        numberOfNonMembers += 1;
      }
    });
    ctx.commit('setNumberOfMembers', numberOfMembers);
    ctx.commit('setNumberOfNonMembers', numberOfNonMembers);
  },
  SET_EDITED: (ctx: any, edited: boolean): any => {
    ctx.commit('setEdited', edited);
  },
  SET_VALID_FORM: (ctx: any, valid: boolean): any => {
    ctx.commit('setValidForm', valid);
  },
  SET_UNAVAILABLE_DATES: (ctx: any, dates: []): any => {
    ctx.commit('setUnavailableDates', dates);
  },
  SET_NO_DATES_AVAILABLE: (ctx: any, available: boolean): any => {
    ctx.commit('setNoDatesAvailable', available);
  },
  SET_AVAILABLE_BEDS: (ctx: any, bedNumber: number): any => {
    ctx.commit('setAvailableBeds', bedNumber);
  },
  CREATE_BOOKING: (ctx: any, values: CreateBookingInfo): any => {
    const headers = { 'content-type': 'application/json', Authorization: '' };
    const authToken = store.getters['auth/getToken'];
    if (authToken) {
      headers.Authorization = `Bearer ${authToken}`;
    }
    ctx.commit('setLoadingStatus', true);
    axios
      .post(Vue.prototype.$apiUrl + '/koie/booking/', values, { headers })
      .then((res) => {
        ctx.commit('setBooking', res.data);
        ctx.commit('setLoadingStatus', false);
      })
      .catch((error) => {
        ctx.commit('setError', true);
        ctx.commit('setLoadingStatus', false);
        throw new Error(`API ${error}`);
      });
  },
  INITIATE_PAYMENT: (ctx: any, values: any): any => {
    const headers = { 'content-type': 'application/json', Authorization: '' };
    const authToken = store.getters['auth/getToken'];
    if (authToken) {
      headers.Authorization = `Bearer ${authToken}`;
    }
    ctx.commit('setLoadingStatus', true);
    axios
      .put(
        Vue.prototype.$apiUrl + '/payments/stripetransaction/' + values.id + '/',
        { token_id: values.token },
        { headers }
      )
      .then(() => {
        ctx.commit('setPaymentConfirmed', true);
        ctx.commit('setStep', 4);
        ctx.commit('setLoadingStatus', false);
      })
      .catch((error) => {
        ctx.commit('setError', true);
        ctx.commit('setLoadingStatus', false);
        ctx.commit('setPaymentConfirmed', false);
        throw new Error(`API ${error}`);
      });
  }
};

export default actions;
