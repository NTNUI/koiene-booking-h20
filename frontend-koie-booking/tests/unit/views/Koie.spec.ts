import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import { storeConfig } from '@/store';
import i18n from '@/i18n';
import scssVars from '@/styles/variables.scss';
import flushPromises from 'flush-promises';
import { cloneDeep } from 'lodash';

import mockAxios from 'jest-mock-axios';
import router from '@/router';
import { routes } from '@/router';

Vue.use(Vuetify);

// Utilities
import { mount, createLocalVue } from '@vue/test-utils';

// Components or views
import Koie from '../../../src/views/Koie.vue';

describe('View Koie.vue', () => {
  let router = new VueRouter({ routes, mode: 'abstract' });
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
    localVue.prototype.$scssVars = scssVars;
    // Hard resets the store between tests
    store = new Vuex.Store(cloneDeep(storeConfig));
  });

  afterEach(() => {
    mockAxios.reset();
    router = new VueRouter({ routes, mode: 'abstract' });
  });

  it('Matches snapshot', async () => {
    router.push('/koie/flåkoia');
    await flushPromises();

    wrapper = mount(Koie, {
      localVue,
      router,
      vuetify,
      i18n,
      store,
    });

    const responseObj = {
      data: { koie: { name: 'flåkoia', description: { description_eng: '' }, location: { terrain_eng: '' } } },
    };
    mockAxios.mockResponse(responseObj);
    await flushPromises();

    expect(wrapper).toMatchSnapshot();
  });

  it('BookBtn changes route', async () => {
    router.push('/koie/flåkoia');
    await flushPromises();

    wrapper = mount(Koie, {
      localVue,
      vuetify,
      router,
      i18n,
      store,
    });

    const spy = jest.spyOn(wrapper.vm.$router, 'push');
    const responseObj = {
      data: { koie: { name: 'flåkoia', description: { description_eng: '' }, location: { terrain_eng: '' } } },
    };
    mockAxios.mockResponse(responseObj);
    await flushPromises();
    const title = wrapper.find('[data-test="bookBtn"]').trigger('click');

    expect(spy).toHaveBeenCalledWith('/booking/flåkoia');
  });

  // This is a very important function of the app
  it('BookBtn disabled when disableBooking is true', async () => {
    router.push('/koie/flåkoia');
    await flushPromises();

    wrapper = mount(Koie, {
      localVue,
      vuetify,
      router,
      i18n,
      store,
      computed: {
        disableBooking() {
          return true;
        },
      },
    });

    const responseObj = {
      data: { koie: { name: 'flåkoia', description: { description_eng: '' }, location: { terrain_eng: '' } } },
    };
    mockAxios.mockResponse(responseObj);
    await flushPromises();

    const bookBtn = wrapper.find('[data-test="bookBtn"]');

    expect(bookBtn.props().disabled).toBe(true);
  });
});
