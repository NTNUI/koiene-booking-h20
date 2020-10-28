import Vue from 'vue';
import Vuetify from 'vuetify';
import { createShallowWrapper } from '../../../utils';
import { Wrapper } from '@vue/test-utils';

import AllReportsView from '@/components/admin/allReportsView/AllReportsView.vue';
Vue.use(Vuetify);

describe('Component AllReportsView', () => {
  let wrapper: Wrapper<any>;

  beforeEach(() => {
    const wrapperOptions = {
      sync: false,
    };
    wrapper = createShallowWrapper(AllReportsView, wrapperOptions);
  });

  it('Matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
