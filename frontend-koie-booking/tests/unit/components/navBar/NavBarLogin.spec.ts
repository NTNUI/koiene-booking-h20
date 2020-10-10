import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

// Components or views
import NavBarLogin from '../../../../src/components/navBar/NavBarLogin.vue';
import { createWrapper } from '../../utils';
import VueRouter from 'vue-router';
import { routes } from '@/router';

describe('Component NavBarLogin.vue', () => {
  it('Matches snapshot', async () => {
    const router = new VueRouter({ routes, mode: 'abstract' });
    const wrapper = createWrapper(NavBarLogin, { router });

    expect(wrapper).toMatchSnapshot();
  });
});
