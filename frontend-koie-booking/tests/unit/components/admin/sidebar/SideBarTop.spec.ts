import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

// Components or views
import SideBarTop from '@/components/admin/sideBar/SideBarTop.vue';
import { createWrapper } from '../../../utils';

describe('Component SideBarTop.vue', () => {
  it('Matches snapshot', () => {
    // Arrange
    const wrapper = createWrapper(SideBarTop, {
      provide: {
        updateView: (index: number) => null,
      },
    });

    // Assert
    expect(wrapper).toMatchSnapshot();
  });
});
