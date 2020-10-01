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

Vue.use(Vuetify);

// Utilities
import { mount, createLocalVue } from '@vue/test-utils';

// Components or views
import ReportSecondStep from '@/components/report/ReportSecondStep.vue';

describe('Component ReportSecondStep.vue', () => {
  let wrapper: any;
  let localVue: any;
  let vuetify: any;
  let store: any;

  beforeEach(() => {
    localVue = createLocalVue();
    vuetify = new Vuetify();
    localVue.use(Vuetify);
    localVue.use(Vuex);
    store = new Vuex.Store(cloneDeep(storeConfig));
    localVue.prototype.$scssVars = scssVars;
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('Matches snapshot', async () => {
    wrapper = mount(ReportSecondStep, {
      localVue,
      vuetify,
      i18n,
      store,
    });

    await flushPromises();

    expect(wrapper).toMatchSnapshot();
  });
});
