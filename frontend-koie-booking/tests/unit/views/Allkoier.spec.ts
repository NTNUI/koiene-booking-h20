import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import { storeConfig } from '@/store';
import i18n from '@/i18n';
import scssVars from '@/styles/variables.scss';
import flushPromises from 'flush-promises';
import mockAxios from 'jest-mock-axios';
import router from '@/router';
import { routes } from '@/router';
import { cloneDeep } from 'lodash';

Vue.use(Vuetify);

// Utilities
import { mount, createLocalVue } from '@vue/test-utils';

// Components or views
import AllKoier from '../../../src/views/AllKoier.vue';

describe('View AllKoier.vue', () => {
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
    // Resets the store between each test (necessary because of a data-saving check in the action that's used)
    // Use the config in Component_Koie.spec.ts if this setup is not necessary in your test
    store = new Vuex.Store(cloneDeep(storeConfig));
    localVue.prototype.$scssVars = scssVars;
  });

  afterEach(() => {
    // cleaning up previous test's mock-api-calls
    mockAxios.reset();
  });

  it('Matches snapshot', async () => {
    wrapper = mount(AllKoier, {
      localVue,
      vuetify,
      router,
      i18n,
      store
    });

    const responseObj = {
      data: { koier: [{ name: 'flåkoia', number_of_beds: 10 }] }
    };
    mockAxios.mockResponse(responseObj);
    await flushPromises();

    expect(wrapper).toMatchSnapshot();
  });

  // This test is unnecessary, but serves as a good selector-example
  it('Displays card with text "flaakoia"', async () => {
    wrapper = mount(AllKoier, {
      localVue,
      vuetify,
      router,
      i18n,
      store
    });

    const responseObj = { data: { koier: [{ name: 'flåkoia', number_of_beds: 10 }] } };
    mockAxios.mockResponse(responseObj);

    const title = wrapper.find('[title="flåkoia"] > .v-card__title');

    await flushPromises();
    expect(title.text()).toBe('flåkoia');
  });

  it('Check routing to correct "Koie.vue"', async () => {
    wrapper = mount(AllKoier, {
      localVue,
      vuetify,
      router,
      i18n,
      store
    });
    const spy = jest.spyOn(wrapper.vm.$router, 'push');
    const responseObj = { data: { koier: [{ name: 'flåkoia', number_of_beds: 10 }] } };
    mockAxios.mockResponse(responseObj);
    await flushPromises();

    const title = wrapper.find('[title="flåkoia"]').trigger('click');

    expect(spy).toHaveBeenCalledWith('/koie/flåkoia');
  });
});
