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

describe('Component SideBarBottom.vue', () => {
  let wrapper: Wrapper<any>;
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
    wrapper = mount(SideBarBottom, {
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
});
