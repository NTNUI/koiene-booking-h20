import { ReportInfo } from '@/store/types';
import axios from 'axios';
import { head } from 'lodash';
import Vue from 'vue';
import store from '@/store';
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
  SET_BOOKING_ID: (ctx: any, booking_id: number): any => {
    ctx.commit('setBookingID', booking_id);
  },
  SET_GAS_IS_FULL: (ctx: any, gasIsFull: boolean): any => {
    ctx.commit('setGasIsFull', gasIsFull);
  },
  SET_FIREWOOD_SUPPLY: (ctx: any, supply: number): any => {
    ctx.commit('setFirewoodSupply', supply);
  },
  SET_CHOPPED_UP_WOOD_SUPPLY: (ctx: any, supply: number): any => {
    ctx.commit('setChoppedUpWoodSupply', supply);
  },
  SET_SMOKE_DETECTOR_IS_WORKING: (ctx: any, smokeDetectorIsWorking: boolean): any => {
    ctx.commit('setSmokeDetectorIsWorking', smokeDetectorIsWorking);
  },
  SET_GAS_BURNER_PRIMUS: (ctx: any, status: number): any => {
    ctx.commit('setGasBurnerPrimus', status);
  },
  SET_AXE: (ctx: any, status: number): any => {
    ctx.commit('setAxe', status);
  },
  SET_HAMMER: (ctx: any, status: number): any => {
    ctx.commit('setHammer', status);
  },
  SET_SAW: (ctx: any, status: number): any => {
    ctx.commit('setSaw', status);
  },
  SET_SAW_BLADE: (ctx: any, status: number): any => {
    ctx.commit('setSawBlade', status);
  },
  SET_SAW_BENCH: (ctx: any, status: number): any => {
    ctx.commit('setSawBench', status);
  },
  SET_SPADE: (ctx: any, status: number): any => {
    ctx.commit('setSpade', status);
  },
  SET_KEROSENE_LAMP: (ctx: any, status: number): any => {
    ctx.commit('setKeroseneLamp', status);
  },
  SET_DETERGENT: (ctx: any, status: number): any => {
    ctx.commit('setDetergent', status);
  },
  SET_DISHWARE: (ctx: any, status: number): any => {
    ctx.commit('setDishware', status);
  },
  SET_COOKWARE: (ctx: any, status: number): any => {
    ctx.commit('setCookware', status);
  },
  SET_CABIN_BOOK: (ctx: any, status: number): any => {
    ctx.commit('setCabinBook', status);
  },
  SET_CANDLE_HOLDERS: (ctx: any, status: number): any => {
    ctx.commit('setCandleHolders', status);
  },
  SET_FIRE_BLANKET: (ctx: any, status: number): any => {
    ctx.commit('setFireBlanket', status);
  },
  SET_FIRE_EXTINGUISHER: (ctx: any, status: number): any => {
    ctx.commit('setFireExtinguisher', status);
  },
  SET_OTHER_FAULTS: (ctx: any, comment: string): any => {
    ctx.commit('setOtherFaults', comment);
  },
  SET_BOAT_SATUS: (ctx: any, status: string): any => {
    ctx.commit('setBoatStatus', status);
  },
  SET_CANOE_STATUS: (ctx: any, status: string): any => {
    ctx.commit('setCanoeStatus', status);
  },
  SET_LIFE_JACKETS_STATUS: (ctx: any, status: string): any => {
    ctx.commit('setLifeJacketsStatus', status);
  },
  SET_FEEDBACK: (ctx: any, feedback: string): any => {
    ctx.commit('setFeedback', feedback);
  },
  CREATE_REPORT: (ctx: any, reportData: ReportInfo): any => {
    const headers = { 'content-type': 'application/json', Authorization: '' };
    const authToken = store.getters['auth/getToken'];
    if (authToken) {
      headers.Authorization = `Bearer ${authToken}`;
    }
    ctx.commit('setLoadingStatus', true);
    axios
      .post(Vue.prototype.$apiUrl + `/koie/reports/${reportData.booking_id}`, reportData, { headers })
      .then((res) => {
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
