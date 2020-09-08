import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { RootState } from './types';
import { koie } from './modules/users/koie/index';
import { booking } from './modules/users/booking/index';
import { avalanche } from './modules/users/avalanche/index';
import { auth } from './modules/users/auth/index';

Vue.use(Vuex, VueAxios, axios);

const store: StoreOptions<RootState> = {
  modules: {
    koie,
    booking,
    avalanche,
    auth
  }
};

export default new Vuex.Store<RootState>(store);

export { store as storeConfig };
