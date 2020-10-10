import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import { routes } from '@/router';

Vue.use(Vuetify);

// Components or views
import Input from '../../../../src/components/login/Input.vue';
import { createWrapper } from '../../utils';

describe('Component Input.vue', () => {
  const router = new VueRouter({ routes, mode: 'abstract' });

  it('Matches snapshot', async () => {
    const wrapper = createWrapper(Input, {
      router,
    });

    expect(wrapper).toMatchSnapshot();
  });
});
