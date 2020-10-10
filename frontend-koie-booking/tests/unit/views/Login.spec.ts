import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

// Components or views
import Login from '../../../src/views/Login.vue';
import { createWrapper } from '../utils';

describe('Component Login.vue', () => {
  it('Matches snapshot', async () => {
    const wrapper = createWrapper(Login);

    expect(wrapper).toMatchSnapshot();
  });
});
