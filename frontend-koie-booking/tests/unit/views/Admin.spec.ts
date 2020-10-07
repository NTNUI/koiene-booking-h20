import Vue, { VueConstructor } from 'vue';
import Vuetify, { Vuetify as VuetifyType } from 'vuetify';
import Vuex, { Store } from 'vuex';
import store, { storeConfig } from '@/store';
import { cloneDeep } from 'lodash';
import scssVars from '@/styles/variables.scss';
import mockAxios from 'jest-mock-axios';

Vue.use(Vuetify);

// Utilities
import { mount, createLocalVue, Wrapper, shallowMount, ThisTypedShallowMountOptions } from '@vue/test-utils';

// Components or views
import Admin from '@/views/Admin.vue';
import { RootState } from '@/store/types';
import SideBar from '@/components/admin/sideBar/SideBar.vue';
import adminViews from '@/components/admin/AdminViews';

describe('View Admin.vue', () => {
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

    wrapperOptions = {
      sync: false,
      localVue,
      vuetify,
      store,
      computed: {
        isAdmin() {
          return true;
        },
      },
    };

    wrapper = mount(Admin, wrapperOptions);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('Matches snapshot', () => {
    const wrapper = shallowMount(Admin, wrapperOptions);
    // Assert
    expect(wrapper).toMatchSnapshot();
  });

  it('Renders sidebar', () => {
    // Assert
    expect(wrapper.contains(SideBar)).toBe(true);
  });

  it('Admin view renders correct component view', () => {
    // Assert
    expect(wrapper.contains(adminViews[0].component)).toBe(true);
  });

  it("Admin view doesn't render wrong view", () => {
    // Assert
    expect(wrapper.contains(adminViews[1].component)).toBe(false);
  });

  it('Admin view updates rendered component view', async () => {
    for (let i = adminViews.length - 1; i > -1; i--) {
      // Act
      await wrapper.find('#sideBar' + adminViews[i].id).trigger('click');

      // Assert
      expect(wrapper.contains(adminViews[i].component)).toBe(true);
    }
  });
});
