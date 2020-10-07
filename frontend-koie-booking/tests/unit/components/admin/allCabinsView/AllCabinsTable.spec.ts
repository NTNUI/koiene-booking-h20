import Vue, { VueConstructor } from 'vue';
import Vuetify, { Vuetify as VuetifyType } from 'vuetify';
import Vuex, { Store } from 'vuex';
import { storeConfig } from '@/store';
import { cloneDeep } from 'lodash';
import scssVars from '@/styles/variables.scss';
import mockAxios from 'jest-mock-axios';

Vue.use(Vuetify);

// Utilities
import { createLocalVue, Wrapper, shallowMount, ThisTypedMountOptions, mount } from '@vue/test-utils';

// Components or views
import AllCabinsTable from '@/components/admin/allCabinsView/AllCabinsTable.vue';
import { RootState } from '@/store/types';
import getKoieData, { MOCK_MOUNT_CABINS_WITH_BOOKINGS, startDate } from '../../../__mocks__/koiene';
import { addToDate } from '@/utils/dates';

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
      localVue,
      vuetify,
      store,
    };

    wrapper = mount(AllCabinsTable, wrapperOptions);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('Matches snapshot', async () => {
    expect(wrapper).toMatchSnapshot();
  });
});
