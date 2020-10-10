import Vue, { VueConstructor } from 'vue';
import Vuetify, { Vuetify as VuetifyType } from 'vuetify';
import Vuex, { Store } from 'vuex';
import { storeConfig } from '@/store';
import { cloneDeep } from 'lodash';
import scssVars from '@/styles/variables.scss';
import mockAxios from 'jest-mock-axios';

Vue.use(Vuetify);

// Utilities
import { createLocalVue, Wrapper, ThisTypedMountOptions, mount } from '@vue/test-utils';

// Components or views
import AllCabinsTable from '@/components/admin/allCabinsView/AllCabinsTable.vue';
import { RootState } from '@/store/types';
import getKoieData, { MOCK_MOUNT_CABINS_WITH_BOOKINGS, startDate } from '../../../__mocks__/koiene';
import { convertAPIBookingToAdminBooking } from '@/store/modules/admin/bookings/helpers';

describe('Component AllCabinsTable.vue', () => {
  let wrapper: Wrapper<any>;
  let localVue: VueConstructor<Vue>;
  let vuetify: VuetifyType;
  let store: Store<RootState>;
  let wrapperOptions: ThisTypedMountOptions<any>;

  beforeEach(() => {
    localVue = createLocalVue();
    vuetify = new Vuetify();
    localVue.use(Vuetify);
    localVue.use(Vuex);
    store = new Vuex.Store(cloneDeep(storeConfig));
    localVue.prototype.$scssVars = scssVars;

    MOCK_MOUNT_CABINS_WITH_BOOKINGS(store);

    wrapperOptions = {
      sync: false,
      localVue,
      vuetify,
      store,
    };

    wrapper = mount(AllCabinsTable, wrapperOptions);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('Matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Cabins are not sorted when table is initially loaded', () => {
    // Arrange
    const allCabinsCorrectOrder = getKoieData().map((booking) => convertAPIBookingToAdminBooking(booking));
    const allCabinsFromComponent = wrapper.vm.allCabinsWithBookings;

    // Assert
    expect(allCabinsFromComponent).toEqual(allCabinsCorrectOrder);
  });

  it('Custom sort on cabin name sorts the cabins in descending order', () => {
    // Arrange
    const allCabinsFromMock = getKoieData().map((booking) => convertAPIBookingToAdminBooking(booking));
    const allCabinsFromComponent = wrapper.vm.allCabinsWithBookings;

    // Act
    const allCabinsCorrectOrder = allCabinsFromMock.sort((cabinA, cabinB) => {
      return cabinA.slug.localeCompare(cabinB.slug);
    });
    const allCabinsFromComponentSorted = wrapper.vm.customSort(allCabinsFromComponent, ['name'], [true]);

    // Assert
    expect(allCabinsFromComponentSorted).toEqual(allCabinsCorrectOrder);
  });

  it('Custom sort on cabin name sorts the cabins in ascending order', () => {
    // Arrange
    const allCabinsFromMock = getKoieData().map((booking) => convertAPIBookingToAdminBooking(booking));
    const allCabinsFromComponent = wrapper.vm.allCabinsWithBookings;

    // Act
    const allCabinsCorrectOrder = allCabinsFromMock.sort((cabinA, cabinB) => {
      return cabinB.slug.localeCompare(cabinA.slug);
    });
    const allCabinsFromComponentSorted = wrapper.vm.customSort(allCabinsFromComponent, ['name'], [false]);

    // Assert
    expect(allCabinsFromComponentSorted).toEqual(allCabinsCorrectOrder);
  });

  it('Custom sort on available dates in descending order', () => {
    // Arrange
    const allCabinsFromMock = getKoieData().map((booking) => convertAPIBookingToAdminBooking(booking));
    const allCabinsFromComponent = wrapper.vm.allCabinsWithBookings;

    // Act
    const allCabinsCorrectOrder = allCabinsFromMock.sort((cabinA, cabinB) => {
      return cabinA.bedsAvailableInDateRange[startDate] - cabinB.bedsAvailableInDateRange[startDate];
    });
    const allCabinsFromComponentSorted = wrapper.vm.customSort(allCabinsFromComponent, [startDate], [true]);

    // Assert
    expect(allCabinsFromComponentSorted).toEqual(allCabinsCorrectOrder);
  });

  it('Custom sort on available dates in ascending order', () => {
    // Arrange
    const allCabinsFromMock = getKoieData().map((booking) => convertAPIBookingToAdminBooking(booking));
    const allCabinsFromComponent = wrapper.vm.allCabinsWithBookings;

    // Act
    const allCabinsCorrectOrder = allCabinsFromMock.sort((cabinA, cabinB) => {
      return cabinB.bedsAvailableInDateRange[startDate] - cabinA.bedsAvailableInDateRange[startDate];
    });
    const allCabinsFromComponentSorted = wrapper.vm.customSort(allCabinsFromComponent, [startDate], [false]);

    // Assert
    expect(allCabinsFromComponentSorted).toEqual(allCabinsCorrectOrder);
  });
});
