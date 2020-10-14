import Vue from 'vue';
import Vuetify from 'vuetify';
import mockAxios from 'jest-mock-axios';

Vue.use(Vuetify);

// Utilities
import { Wrapper, ThisTypedShallowMountOptions } from '@vue/test-utils';

// Components or views
import Admin from '@/views/Admin.vue';
import { RootState } from '@/store/types';
import SideBar from '@/components/admin/sideBar/SideBar.vue';
import adminViews from '@/components/admin/AdminViews';
import { createShallowWrapper, createWrapper } from '../utils';

describe('View Admin.vue', () => {
  let wrapper: Wrapper<any>;
  let wrapperOptions: ThisTypedShallowMountOptions<any>;

  beforeEach(() => {
    wrapperOptions = {
      sync: false,
      computed: {
        isAdmin() {
          return true;
        },
      },
    };

    wrapper = createWrapper(Admin, wrapperOptions);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('Matches snapshot', () => {
    const wrapper = createShallowWrapper(Admin, wrapperOptions);
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
