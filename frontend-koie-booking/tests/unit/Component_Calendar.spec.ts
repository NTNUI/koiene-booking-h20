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
import { getDateString } from '@/utils/dates';

Vue.use(Vuetify);

// Utilities
import { mount, createLocalVue } from '@vue/test-utils';

// Components or views
import Calendar from '../../src/components/Calendar.vue';

describe('Component Calendar.vue', () => {
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
    wrapper = mount(Calendar, {
      localVue,
      router,
      vuetify,
      i18n,
      store,
      propsData: {
        allKoier: false,
        row: false
      }
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('Departure date later than arrival date', async () => {
    wrapper = mount(Calendar, {
      localVue,
      router,
      vuetify,
      i18n,
      store,
      propsData: {
        allKoier: false,
        row: false
      }
    });

    // Set dateFrom to one day ahead of the initial dateTo-date
    wrapper.vm.dateFrom = getDateString(undefined, 2);
    // Expect dateTo to be the day after the new dateFrom.
    expect(wrapper.vm.dateTo).toBe(getDateString(undefined, 3));
  });

  it('Cannot choose dates around a disabled date', async () => {
    // Setting the required store values instead of mocking.
    const bedsPerDate: any = {};
    const date1 = getDateString(undefined, 2);
    bedsPerDate[date1] = 0;
    store.commit('koie/setKoieData', {
      koie: {
        beds_available_in_booking_window: bedsPerDate
      }
    });

    wrapper = mount(Calendar, {
      localVue,
      vuetify,
      router,
      i18n,
      store
    });

    expect(wrapper.vm.dateFrom).toBe(getDateString());
    expect(wrapper.vm.maximumDateTo).toBe(date1);
  });

  it('Disabled dates is disabled on the dateFrom (arrival) picker', async () => {
    // Setting the required store values instead of mocking.
    const bedsPerDate: any = {};
    const date1 = getDateString(undefined, 2);
    const date2 = getDateString(undefined, 10);
    bedsPerDate[date1] = 0;
    bedsPerDate[date2] = 0;
    store.commit('koie/setKoieData', {
      koie: {
        beds_available_in_booking_window: bedsPerDate
      }
    });

    wrapper = mount(Calendar, {
      localVue,
      vuetify,
      router,
      i18n,
      store
    });

    expect(wrapper.vm.allowedDatesFrom(wrapper.vm.disabledDates[0])).toBe('');
    expect(wrapper.vm.allowedDatesFrom(wrapper.vm.disabledDates[1])).toBe('');
  });

  it('Koie can be booked maximum x days in advance', async () => {
    wrapper = mount(Calendar, {
      localVue,
      vuetify,
      router,
      i18n,
      store,
      data() {
        return {
          disabledDates: []
        };
      },
      computed: {
        daysInAdvanceBooking() {
          return 14;
        }
      }
    });

    const days = wrapper.vm.daysInAdvanceBooking;
    const expectedMaxDateTo = getDateString(undefined, days);
    const expectedMaxDateFrom = getDateString(undefined, days - 1);

    expect(wrapper.vm.maximumDate).toBe(expectedMaxDateFrom);
    expect(wrapper.vm.maximumDateTo).toBe(expectedMaxDateTo);
  });

  it('Booking disabled when no available dates', async () => {
    // Setting the required store values instead of mocking.
    const bedsPerDate: any = {};
    const today = getDateString();
    const tomorrow = getDateString(undefined, 1);
    bedsPerDate[today] = 0;
    bedsPerDate[tomorrow] = 0;
    store.commit('koie/setKoieData', {
      koie: { beds_available_in_booking_window: bedsPerDate }
    });

    wrapper = mount(Calendar, {
      localVue,
      vuetify,
      router,
      i18n,
      store,
      computed: {
        daysInAdvanceBooking() {
          return 2;
        }
      }
    });

    expect(wrapper.vm.noDatesAvailable).toBe(true);
    expect(store.state.avalanche.disableBooking).toBe(true);
  });

  it('Reset #beds when switching to dates with less beds available', async () => {
    // Setting the required store values instead of mocking.
    const bedsPerDate: any = {};
    const today = getDateString();
    const tomorrow = getDateString(undefined, 1);
    bedsPerDate[today] = 11;
    bedsPerDate[tomorrow] = 5;
    store.commit('koie/setKoieData', {
      koie: { beds_available_in_booking_window: bedsPerDate }
    });

    wrapper = mount(Calendar, {
      localVue,
      vuetify,
      router,
      i18n,
      store
    });

    wrapper.vm.beds = 11;
    wrapper.vm.setBeds(11);
    wrapper.vm.dateFrom = tomorrow;
    expect(wrapper.vm.beds).toBe(1);
  });
});
