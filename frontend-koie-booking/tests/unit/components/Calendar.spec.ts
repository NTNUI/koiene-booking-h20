import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex, { Store } from 'vuex';
import { storeConfig } from '@/store';
import { cloneDeep } from 'lodash';
import { getDateString } from '@/utils/dates';

Vue.use(Vuetify);

// Components or views
import Calendar from '../../../src/components/Calendar.vue';
import { createWrapper } from '../utils';
import { RootState } from '@/store/types';

describe('Component Calendar.vue', () => {
  let store: Store<RootState>;
  beforeEach(() => {
    store = new Vuex.Store(cloneDeep(storeConfig));
  });

  it('Matches snapshot', async () => {
    const wrapper = createWrapper(Calendar, {
      propsData: {
        allKoier: false,
        row: false,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('Departure date later than arrival date', async () => {
    const wrapper: any = createWrapper(Calendar, {
      propsData: {
        allKoier: false,
        row: false,
      },
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
        beds_available_in_booking_window: bedsPerDate,
      },
    });

    const wrapper: any = createWrapper(Calendar, {
      store,
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
        beds_available_in_booking_window: bedsPerDate,
      },
    });

    const wrapper: any = createWrapper(Calendar, {
      store,
    });

    expect(wrapper.vm.allowedDatesFrom(wrapper.vm.disabledDates[0])).toBe('');
    expect(wrapper.vm.allowedDatesFrom(wrapper.vm.disabledDates[1])).toBe('');
  });

  it('Koie can be booked maximum x days in advance', async () => {
    const wrapper: any = createWrapper(Calendar, {
      data() {
        return {
          disabledDates: [],
        };
      },
      computed: {
        daysInAdvanceBooking() {
          return 14;
        },
      },
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
      koie: { beds_available_in_booking_window: bedsPerDate },
    });

    const wrapper: any = createWrapper(Calendar, {
      store,
      computed: {
        daysInAdvanceBooking() {
          return 2;
        },
      },
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
      koie: { beds_available_in_booking_window: bedsPerDate },
    });

    const wrapper: any = createWrapper(Calendar, {
      store,
    });

    wrapper.vm.beds = 11;
    wrapper.vm.setBeds(11);
    wrapper.vm.dateFrom = tomorrow;
    expect(wrapper.vm.beds).toBe(1);
  });
});
