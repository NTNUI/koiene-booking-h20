import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import store from '@/store';
import i18n from '@/i18n';
import scssVars from '@/styles/variables.scss';
import flushPromises from 'flush-promises';
import mockAxios from 'jest-mock-axios';

Vue.use(Vuetify);

// Utilities
import { mount, createLocalVue } from '@vue/test-utils';

// Components or views
import BookingThirdStep from '@/components/booking/BookingThirdStep.vue';

describe('Component BookingThirdStep.vue', () => {
  // Router not needed for this test-suite
  let wrapper: any;
  let localVue: any;
  let vuetify: any;

  beforeEach(() => {
    localVue = createLocalVue();
    vuetify = new Vuetify();
    localVue.use(Vuetify);
    localVue.use(Vuex);
    localVue.prototype.$scssVars = scssVars;
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('Matches snapshot', async () => {
    wrapper = mount(BookingThirdStep, {
      localVue,
      vuetify,
      i18n,
      store,
      computed: {
        price() {
          return 120;
        },
      },
      stubs: ['Card'],
    });

    expect(wrapper).toMatchSnapshot();
  });
});
