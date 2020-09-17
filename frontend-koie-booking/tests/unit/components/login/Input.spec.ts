import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import { storeConfig } from '@/store';
import { cloneDeep } from 'lodash';
import i18n from '@/i18n';
import scssVars from '@/styles/variables.scss';
import mockAxios from 'jest-mock-axios';
import { routes } from '@/router';

Vue.use(Vuetify);

// Utilities
import { mount, createLocalVue } from '@vue/test-utils';

// Components or views
import Input from '../../../../src/components/login/Input.vue';

describe('Component Input.vue', () => {
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
    wrapper = mount(Input, {
      localVue,
      router,
      vuetify,
      i18n,
      store
    });

    expect(wrapper).toMatchSnapshot();
  });
});