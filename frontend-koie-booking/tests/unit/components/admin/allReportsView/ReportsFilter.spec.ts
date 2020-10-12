import Vue, { VueConstructor } from 'vue';
import Vuetify, { Vuetify as VuetifyType } from 'vuetify';
import Vuex, { Store } from 'vuex';
import { storeConfig } from '@/store';
import { cloneDeep } from 'lodash';
import mockAxios from 'jest-mock-axios';

Vue.use(Vuetify);

// Utilities
import { Wrapper } from '@vue/test-utils';

// Components or views
import ReportsFilter from '@/components/admin/allReportsView/ReportsFilter.vue';

// Components or views
import { RootState } from '@/store/types';
import { MOCK_MOUNT_CABINS, MOCK_SET_CHOSEN_CABIN, MOCK_SET_EXPANDED } from '../../../__mocks__/koiene';
import { createWrapper } from '../../../utils';

describe('Component ReportsFilter.vue', () => {
  let wrapper: Wrapper<any>;
  let store: Store<RootState>;
  const setChosenCabin = jest.fn();
  const setExpanded = jest.fn();
  const mountCabins = jest.fn();

  beforeEach(() => {
    store = new Vuex.Store(cloneDeep(storeConfig));
    MOCK_MOUNT_CABINS(store);

    const wrapperOptions = {
      sync: false,
      store,
      methods: {
        setChosenCabin,
        setExpanded,
        mountCabins,
      },
    };

    wrapper = createWrapper(ReportsFilter, wrapperOptions);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('Matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Dispatches mountCabins', () => {
    expect(mountCabins).toHaveBeenCalled();
  });

  it('Calls setExpanded when button clicked with correct input', async () => {
    const button = wrapper.find('.v-btn');
    await button.trigger('click');
    expect(setExpanded).toHaveBeenCalledWith(true);
  });

  it('Should show filter chips when expanded is true', () => {
    MOCK_SET_EXPANDED(store, true);

    const newWrapperOptions = {
      sync: false,
      store,
    };

    wrapper = createWrapper(ReportsFilter, newWrapperOptions);
    expect(wrapper.findAll('.v-chip').isVisible()).toBe(true);
  });

  it('Sets chosen cabin on click with setChosenCabin', async () => {
    const cabinChip = wrapper.find('.v-chip:first-of-type');
    await cabinChip.trigger('click');
    expect(setChosenCabin).toHaveBeenCalledWith('flåkoia');
  });

  it('Should highlight chosen cabin chip', () => {
    const cabinSlug = 'flåkoia';
    MOCK_SET_CHOSEN_CABIN(store, cabinSlug);

    const newWrapperOptions = {
      sync: false,
      store,
    };

    wrapper = createWrapper(ReportsFilter, newWrapperOptions);

    const componentChosenCabin = wrapper.vm.chosenCabin;
    expect(componentChosenCabin).toEqual(cabinSlug);
  });

  it('Should hide filter chips on mount', () => {
    expect(wrapper.findAll('.v-chip').isVisible()).toBe(false);
  });
});
