import Vue, { VueConstructor } from 'vue';
import Vuetify, { Vuetify as VuetifyType } from 'vuetify';
import Vuex, { Store } from 'vuex';
import { storeConfig } from '@/store';
import { cloneDeep } from 'lodash';
import scssVars from '@/styles/variables.scss';
import mockAxios from 'jest-mock-axios';

Vue.use(Vuetify);

// Utilities
import { mount, createLocalVue, Wrapper, ThisTypedShallowMountOptions } from '@vue/test-utils';

// Components or views
import AllCabinsView from '@/components/admin/allCabinsView/AllCabinsView.vue';
import { RootState } from '@/store/types';
import { addToDate } from '@/utils/dates';
import getKoieData, { startDate } from '../../../__mocks__/koiene';

describe('Component AllCabinsView.vue', () => {
  let wrapper: Wrapper<any>;
  let localVue: VueConstructor<Vue>;
  let vuetify: VuetifyType;
  let store: Store<RootState>;
  let wrapperOptions: ThisTypedShallowMountOptions<any>;

  beforeEach(() => {
    localVue = createLocalVue();
    vuetify = new Vuetify();
    localVue.use(Vuetify);
    localVue.use(Vuex);
    store = new Vuex.Store(cloneDeep(storeConfig));
    localVue.prototype.$scssVars = scssVars;

    store.commit('adminBookings/setStartDate', startDate);
    const endDate = addToDate(startDate, 7, 'day');
    store.dispatch('adminBookings/MOUNT_CABINS_WITH_BOOKINGS', {
      startDate: startDate,
      endDate: endDate,
    });
    const mountCabinsWithBookings = jest.fn();

    wrapperOptions = {
      localVue,
      vuetify,
      store,
      methods: {
        mountCabinsWithBookings,
      },
    };

    wrapper = mount(AllCabinsView, wrapperOptions);
    mockAxios.mockResponse({ data: { koier: getKoieData() } });
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('Matches snapshot', () => {
    // Assert
    expect(wrapper).toMatchSnapshot();
  });
});
