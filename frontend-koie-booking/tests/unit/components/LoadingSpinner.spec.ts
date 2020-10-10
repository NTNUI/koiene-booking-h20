import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

// Components or views
import LoadingSpinner from '../../../src/components/LoadingSpinner.vue';
import { createWrapper } from '../utils';

describe('Component LoadingSpinner.vue', () => {
  it('Matches snapshot', async () => {
    const wrapper = createWrapper(LoadingSpinner);

    expect(wrapper).toMatchSnapshot();
  });
});
