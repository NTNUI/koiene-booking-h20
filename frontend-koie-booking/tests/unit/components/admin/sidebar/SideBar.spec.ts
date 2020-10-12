import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

// Components or views
import SideBarBottom from '@/components/admin/sideBar/SideBarBottom.vue';
import SideBarTop from '@/components/admin/sideBar/SideBarTop.vue';
import SideBar from '@/components/admin/sideBar/SideBar.vue';
import { createWrapper } from '../../../utils';

describe('Component SideBar.vue', () => {
  it('Matches snapshot', () => {
    // Arrange
    const wrapper = createWrapper(SideBar, {
      provide: {
        getCurrentView: () => null,
        setCurrentView: (index: number) => null,
      },
    });

    // Assert
    expect(wrapper).toMatchSnapshot();
  });

  // TODO: It's crashing when ran in parallell, needs to be investigated
  it('Renders SideBarTop', () => {
    // Arrange
    const wrapper = createWrapper(SideBar, {
      provide: {
        getCurrentView: () => null,
        setCurrentView: (index: number) => null,
      },
    });

    expect(wrapper.contains(SideBarTop)).toBe(true);
  });

  it('Renders SideBarBottom', () => {
    // Arrange
    const wrapper = createWrapper(SideBar, {
      provide: {
        getCurrentView: () => null,
        setCurrentView: (index: number) => null,
      },
    });

    expect(wrapper.contains(SideBarBottom)).toBe(true);
  });
});
