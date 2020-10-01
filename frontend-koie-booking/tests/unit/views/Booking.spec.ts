import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import { storeConfig } from '@/store';
import { cloneDeep } from 'lodash';
import i18n from '@/i18n';
import scssVars from '@/styles/variables.scss';
import flushPromises from 'flush-promises';
import mockAxios from 'jest-mock-axios';

Vue.use(Vuetify);

// Utilities
import { mount, createLocalVue } from '@vue/test-utils';

// Components or views
import Booking from '@/views/Booking.vue';
import BookingFirstStep from '@/components/booking/BookingFirstStep.vue';
import BookingSecondStep from '@/components/booking/BookingSecondStep.vue';

describe('View Booking.vue', () => {
  // Router not needed for this test-suite
  let wrapper: any;
  let localVue: any;
  let vuetify: any;
  let store: any;

  beforeEach(() => {
    localVue = createLocalVue();
    vuetify = new Vuetify();
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
    wrapper = mount(Booking, {
      localVue,
      vuetify,
      i18n,
      store,
      propsData: {
        allKoier: false,
        row: false
      },
      mocks: {
        $route: {
          params: { id: 'flåkoia' }
        }
      }
    });

    const responseObj = { data: { koie: { name: 'flåkoia' } } };
    mockAxios.mockResponse(responseObj);
    await flushPromises();

    expect(wrapper).toMatchSnapshot();
  });

  it('Button_next renders next bookingStep', async () => {
    wrapper = mount(Booking, {
      localVue,
      vuetify,
      i18n,
      store,
      propsData: {
        allKoier: false,
        row: false
      },
      mocks: {
        $route: {
          params: { id: 'flåkoia' }
        }
      }
    });

    const responseObj = { data: { koie: { name: 'flåkoia' } } };
    mockAxios.mockResponse(responseObj);
    await flushPromises();

    wrapper.find('[data-test="btnNext"]').trigger('click');

    expect(wrapper.contains(BookingSecondStep)).toBe(true);
    expect(wrapper.contains(BookingFirstStep)).toBe(false);
  });

  it('Button_prev renders prev bookingStep', async () => {
    wrapper = mount(Booking, {
      localVue,
      vuetify,
      i18n,
      store,
      propsData: {
        allKoier: false,
        row: false
      },
      mocks: {
        $route: {
          params: { id: 'flåkoia' }
        }
      }
    });

    const responseObj = { data: { koie: { name: 'flåkoia' } } };
    mockAxios.mockResponse(responseObj);
    await flushPromises();

    wrapper.find('[data-test="btnNext"]').trigger('click');
    wrapper.find('[data-test="btnPrev"]').trigger('click');
    await flushPromises();

    expect(wrapper.contains(BookingFirstStep)).toBe(true);
    expect(wrapper.contains(BookingSecondStep)).toBe(false);
  });
});
