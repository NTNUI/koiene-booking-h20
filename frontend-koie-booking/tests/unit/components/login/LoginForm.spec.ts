import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import { routes } from '@/router';

Vue.use(Vuetify);

// Components or views
import LoginForm from '@/components/login/LoginForm.vue';
import { createWrapper } from '../../utils';

describe('Component LoginForm.vue', () => {
  const router = new VueRouter({ routes, mode: 'abstract' });

  it('Matches snapshot', async () => {
    const wrapper = createWrapper(LoginForm, {
      router,
    });

    expect(wrapper).toMatchSnapshot();
  });
});
