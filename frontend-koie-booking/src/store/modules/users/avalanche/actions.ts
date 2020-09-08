import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex, axios);

export const actions = {
  SET_WARNING_LEVELS: (ctx: any, warningLevels: []): any => {
    ctx.commit('setWarningLevels', warningLevels);
  },
  DISABLE_BOOKING: (ctx: any, disable: boolean): any => {
    ctx.commit('disableBooking', disable);
  },
  FETCH_AVALANCHE_LEVELS: async (ctx: any, values: any): Promise<any> => {
    await axios
      .get(
        'https://api01.nve.no/hydrology/forecast/avalanche/v5.0.1/api/AvalancheWarningByCoordinates/Simple/' +
          values.latitude +
          '/' +
          values.longitude +
          '/' +
          values.language +
          '/' +
          values.dateFrom +
          '/' +
          values.dateTo
      )
      .then((res) => {
        const warningInformation =
          res.data &&
          res.data.map((warning: any) => {
            const warningLevel = warning.DangerLevel;
            const validTo = warning.ValidTo;
            return { warningLevel: warningLevel, validTo: validTo };
          });
        ctx.commit('setWarningData', warningInformation);
      })
      .catch((error) => {
        throw new Error(`API ${error}`);
      });

    ctx.commit('setWarningLevels');
  }
};
