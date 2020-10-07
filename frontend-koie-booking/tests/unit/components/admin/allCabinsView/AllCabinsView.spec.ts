import Vue, { VueConstructor } from 'vue';
import Vuetify, { Vuetify as VuetifyType } from 'vuetify';
import Vuex, { Store } from 'vuex';
import { storeConfig } from '@/store';
import { cloneDeep } from 'lodash';
import scssVars from '@/styles/variables.scss';
import mockAxios from 'jest-mock-axios';

Vue.use(Vuetify);

// Utilities
import { createLocalVue, Wrapper, ThisTypedShallowMountOptions, shallowMount } from '@vue/test-utils';

// Components or views
import AllCabinsView from '@/components/admin/allCabinsView/AllCabinsView.vue';
import { RootState } from '@/store/types';

describe('Component AllCabinsView.vue', () => {
  let wrapper: Wrapper<any>;
  let localVue: VueConstructor<Vue>;
  let vuetify: VuetifyType;
  let store: Store<RootState>;
  let wrapperOptions: ThisTypedShallowMountOptions<any>;
  const mountCabinsWithBookings = jest.fn();

  beforeEach(() => {
    localVue = createLocalVue();
    vuetify = new Vuetify();
    localVue.use(Vuetify);
    localVue.use(Vuex);
    store = new Vuex.Store(cloneDeep(storeConfig));
    localVue.prototype.$scssVars = scssVars;

    wrapperOptions = {
      localVue,
      vuetify,
      store,
      methods: {
        mountCabinsWithBookings,
      },
    };

    wrapper = shallowMount(AllCabinsView, wrapperOptions);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('Matches snapshot', () => {
    // Assert
    expect(wrapper).toMatchSnapshot();
  });
  it('mountCabins has been dispatched', () => {
    expect(mountCabinsWithBookings).toHaveBeenCalled();
  });
});
