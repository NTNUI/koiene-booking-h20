import { ActionTree } from 'vuex';
import axios from 'axios';
import Vue from 'vue';
import { KoieState, RootState } from '../../../types';

/* ActionTree: represents an object expecting some keys, defining the name of the actions and
an Action associated to, in this case "fetch_data" */

export const actions: ActionTree<KoieState, RootState> = {
  FETCH_DATA: async (ctx: any, koieName: String): Promise<any> => {
    ctx.commit('setLoadingStatus', true);
    await axios
      .get(Vue.prototype.$apiUrl + '/koie/koie/' + koieName)
      .then((response: any) => {
        ctx.commit('setKoieData', response.data);
        ctx.commit('setLoadingStatus', false);
      })
      .catch((error) => {
        ctx.commit('setError');
        ctx.commit('setLoadingStatus', false);
        throw new Error(`API ${error}`);
      });
  },
  FETCH_ALL_KOIER: (ctx: any): any => {
    if (ctx.state.allKoier.length === 0) {
      ctx.commit('setLoadingStatus', true);
      axios
        .get(Vue.prototype.$apiUrl + '/koie/koie/')
        .then((res: any) => {
          ctx.commit('setAllKoier', res.data.koier);
          ctx.commit('setLoadingStatus', false);
        })
        .catch((error) => {
          ctx.commit('setError');
          ctx.commit('setLoadingStatus', false);
          throw new Error(`API ${error}`);
        });
    }
  },
};

export default actions;
