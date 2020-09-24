import { CreateReportInfo } from '@/store/types';
import axios from 'axios';
import Vue from 'vue';

export const actions = {
  SET_STEP: (ctx: any, step: number): any => {
    ctx.commit('setStep', step);
  },
  SET_EDITED: (ctx: any, edited: boolean): any => {
    ctx.commit('setEdited', edited);
  },
  SET_VALID_FORM: (ctx: any, valid: boolean): any => {
    ctx.commit('setValidForm', valid);
  },
  SET_GAS_IS_EMPTY: (ctx: any, status: number): any => {
    ctx.commit('setGasIsEmpty', status);
  },
  SET_FIREWOOD_SUPPLY: (ctx: any, supply: number): any => {
    ctx.commit('setFirewoodSupply', supply);
  },
  SET_CHPOPPED_UP_WOOD_SUPPLY: (ctx: any, supply: number): any => {
    ctx.commit('setChoppedUpWoodSupply', supply);
  }, //en set for hver felt i databasen?
  CREATE_REPORT: (ctx: any, values: CreateReportInfo): any => {
    const headers = { 'content-type': 'application/json' }; //, Authorization: ''
    // const authToken = store.getters['auth/getToken'];
    // if (authToken) {
    //   headers.Authorization = `Bearer ${authToken}`;
    // }
    //Hva gjør commit?
    ctx.commit('setLoadingStatus', true);
    axios
      //Hvordan sender vi inn booking id? riktig det her?
      .post(Vue.prototype.$apiUrl + `/koie/reports/${values.booking}$`, values, { headers })
      .then((res) => {
        ctx.commit('setReport', res.data);
        ctx.commit('setLoadingStatus', false);
      })
      .catch((error) => {
        ctx.commit('setError', true);
        ctx.commit('setLoadingStatus', false);
        throw new Error(`API ${error}`);
      });
  }
};

export default actions;
