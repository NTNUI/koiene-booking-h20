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
import BookingSecondStep from '@/components/booking/BookingSecondStep.vue';

describe('Component BookingSecondStep.vue', () => {
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
    wrapper = mount(BookingSecondStep, {
      localVue,
      vuetify,
      i18n,
      store,
      sync: false,
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('Calculate total price of 1x member, 2x non-member', async () => {
    wrapper = mount(BookingSecondStep, {
      localVue,
      vuetify,
      i18n,
      store,
      data() {
        return {
          guests: [
            { name: '', number: '', email: '', isMember: true, isMainBooker: true },
            { name: '', number: '', isMember: false, isMainBooker: false },
            { name: '', number: '', isMember: false, isMainBooker: false }
          ]
        };
      },
      sync: false,
    });

    expect(wrapper.vm.price).toBe(200);
  });
});
