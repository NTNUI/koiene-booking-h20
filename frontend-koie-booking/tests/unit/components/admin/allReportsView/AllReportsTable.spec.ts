import Vue from 'vue';
import Vuetify from 'vuetify';
import { createWrapper } from '../../../utils';
import { Wrapper } from '@vue/test-utils';

import AllReportsTable from '@/components/admin/allReportsView/AllReportsTable.vue';
Vue.use(Vuetify);

describe('Component AllReportsTable', () => {
  let wrapper: Wrapper<any>;

  beforeEach(() => {
    const wrapperOptions = {
      sync: false,
    };
    wrapper = createWrapper(AllReportsTable, wrapperOptions);
  });

  it('Matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
