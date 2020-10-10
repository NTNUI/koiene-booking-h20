import Vuetify from 'vuetify';
import Vue from 'vue';

Vue.use(Vuetify);
// Utilities
import { Wrapper } from '@vue/test-utils';

import { createShallowWrapper } from '../../../utils';
// Components or views
import AllCabinsView from '@/components/admin/allCabinsView/AllCabinsView.vue';

describe('Component AllCabinsView.vue', () => {
  let wrapper: Wrapper<any>;
  const mountCabinsWithBookings = jest.fn();

  beforeEach(() => {
    const wrapperOptions = {
      methods: {
        mountCabinsWithBookings,
      },
    };

    wrapper = createShallowWrapper(AllCabinsView, wrapperOptions);
  });

  it('Matches snapshot', () => {
    // Assert
    expect(wrapper).toMatchSnapshot();
  });
  it('mountCabins has been dispatched', () => {
    expect(mountCabinsWithBookings).toHaveBeenCalled();
  });
});
