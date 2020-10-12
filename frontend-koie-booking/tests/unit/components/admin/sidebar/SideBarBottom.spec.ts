import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

// Components or views
import SideBarBottom from '@/components/admin/sideBar/SideBarBottom.vue';
import { createWrapper } from '../../../utils';

describe('Component SideBarBottom.vue', () => {
  it('Matches snapshot', () => {
    // Arrange
    const wrapper = createWrapper(SideBarBottom, {
      provide: {
        getCurrentView: () => null,
        setCurrentView: (index: number) => null,
      },
    });

    // Assert
    expect(wrapper).toMatchSnapshot();
  });
});
