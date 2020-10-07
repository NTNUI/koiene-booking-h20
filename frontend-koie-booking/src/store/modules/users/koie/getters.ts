import { GetterTree } from 'vuex';
import { KoieState, RootState } from '../../../types';

export const getters: GetterTree<KoieState, RootState> = {
  koieDescription: (state, getters) => {
    //   If the site should be expanded to more than two languages, then return something like state.koieData['koiedescription_' + state.currentLocale]
    return state.currentLocale === 'en'
      ? state.koieData.description.description_eng
      : state.koieData.description.description_nor;
  },
  koieTerrain: (state, getters) => {
    return state.currentLocale === 'en' ? state.koieData.location.terrain_eng : state.koieData.location.terrain_nor;
  },
  koieWeatherLink: (state, getters) => {
    return state.currentLocale === 'en'
      ? state.koieData.description.yr_link_eng
      : state.koieData.description.yr_link_nor;
  },
  parking: (state, getters) => {
    return state.currentLocale === 'en'
      ? state.koieData.description.parking_eng
      : state.koieData.description.parking_nor;
  },
  position: (state, getters) => {
    return `https://www.google.com/maps/place/${state.koieData.location.latitude},${state.koieData.location.longitude}`;
  },
};

export default getters;
