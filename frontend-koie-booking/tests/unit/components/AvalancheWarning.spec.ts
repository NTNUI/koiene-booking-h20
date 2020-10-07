import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import { storeConfig } from '@/store';
import { cloneDeep } from 'lodash';
import i18n from '@/i18n';
import scssVars from '@/styles/variables.scss';
import flushPromises from 'flush-promises';
import mockAxios from 'jest-mock-axios';
import { routes } from '@/router';
import { getDateString } from '@/utils/dates';

Vue.use(Vuetify);

// Utilities
import { mount, createLocalVue } from '@vue/test-utils';

// Components or views
import AvalancheWarning from '../../../src/components/AvalancheWarning.vue';

describe('Component AvalancheWarning.vue', () => {
  const router = new VueRouter({ routes, mode: 'abstract' });
  let wrapper: any;
  let localVue: any;
  let vuetify: any;
  let store: any;

  beforeEach(() => {
    localVue = createLocalVue();
    vuetify = new Vuetify();
    localVue.use(VueRouter);
    localVue.use(Vuetify);
    localVue.use(Vuex);
    // Hard resets the store between tests
    store = new Vuex.Store(cloneDeep(storeConfig));
    localVue.prototype.$scssVars = scssVars;
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('Matches snapshot', async () => {
    wrapper = mount(AvalancheWarning, {
      localVue,
      router,
      vuetify,
      i18n,
      store,
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('Disabling booking if dangerLevel >2', async () => {
    const dates = [new Date().toISOString(), getDateString(undefined, 1), getDateString(undefined, 2)];
    store.dispatch('booking/SET_DATE_FROM', dates[0]);
    store.dispatch('booking/SET_DATE_TO', dates[2]);

    wrapper = mount(AvalancheWarning, {
      localVue,
      router,
      vuetify,
      i18n,
      store,
    });

    const spy = jest.spyOn(wrapper.vm.$store, 'dispatch');

    const responseObj = {
      data: [
        { DangerLevel: '3', ValidTo: dates[0] },
        { DangerLevel: '3', ValidTo: dates[1] },
        { DangerLevel: '3', ValidTo: dates[2] },
      ],
    };
    mockAxios.mockResponse(responseObj);
    await flushPromises();

    expect(spy).toBeCalledWith('avalanche/DISABLE_BOOKING', true);
    expect(spy).not.toBeCalledWith('avalanche/DISABLE_BOOKING', false);
  });
});
