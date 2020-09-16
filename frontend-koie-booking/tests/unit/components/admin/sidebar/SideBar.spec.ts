import Vue, { VueConstructor } from 'vue';
import Vuetify, { Vuetify as VuetifyType } from 'vuetify';
import Vuex, { Store } from 'vuex';
import { storeConfig } from '@/store';
import { cloneDeep } from 'lodash';
import scssVars from '@/styles/variables.scss';
import mockAxios from 'jest-mock-axios';

Vue.use(Vuetify);

// Utilities
import { mount, createLocalVue, Wrapper } from '@vue/test-utils';

// Components or views
import { RootState } from '@/store/types';
import SideBarBottom from '@/components/admin/sideBar/SideBarBottom.vue';
import SideBarTop from '@/components/admin/sideBar/SideBarTop.vue';
import SideBar from '@/components/admin/sideBar/SideBar.vue';

describe('Component SideBar.vue', () => {
  let localVue: VueConstructor<Vue>;
  let vuetify: VuetifyType;
  let store: Store<RootState>;

  beforeEach(() => {
    localVue = createLocalVue();
    vuetify = new Vuetify();
    localVue.use(Vuetify);
    localVue.use(Vuex);
    store = new Vuex.Store(cloneDeep(storeConfig));
    localVue.prototype.$scssVars = scssVars;
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('Matches snapshot', () => {
    // Arrange
    const wrapper = mount(SideBar, {
      localVue,
      vuetify,
      store,
      provide: {
        getCurrentView: () => null,
        setCurrentView: (index: number) => null
      }
    });

    // Assert
    expect(wrapper).toMatchSnapshot();
  });

  // TODO: It's crashing when ran in parallell, needs to be investigated
  it('Renders SideBarTop', () => {
    // Arrange
    const wrapper = mount(SideBar, {
      localVue,
      vuetify,
      store,
      provide: {
        getCurrentView: () => null,
        setCurrentView: (index: number) => null
      }
    });

    expect(wrapper.contains(SideBarTop)).toBe(true);
  });

  it('Renders SideBarBottom', () => {
    // Arrange
    const wrapper = mount(SideBar, {
      localVue,
      vuetify,
      store,
      provide: {
        getCurrentView: () => null,
        setCurrentView: (index: number) => null
      }
    });

    expect(wrapper.contains(SideBarBottom)).toBe(true);
  });
});
