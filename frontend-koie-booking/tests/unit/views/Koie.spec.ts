import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import flushPromises from 'flush-promises';

import mockAxios from 'jest-mock-axios';
import router from '@/router';
import { routes } from '@/router';

Vue.use(Vuetify);

// Components or views
import Koie from '../../../src/views/Koie.vue';
import { createWrapper } from '../utils';

describe('View Koie.vue', () => {
  it('Matches snapshot', async () => {
    const router = new VueRouter({ routes, mode: 'abstract' });
    router.push('/koie/flåkoia');
    await flushPromises();

    const wrapper = createWrapper(Koie, {
      router,
    });

    const responseObj = {
      data: { koie: { name: 'flåkoia', description: { description_eng: '' }, location: { terrain_eng: '' } } },
    };
    mockAxios.mockResponse(responseObj);
    await flushPromises();

    expect(wrapper).toMatchSnapshot();
  });

  it('BookBtn changes route', async () => {
    const router = new VueRouter({ routes, mode: 'abstract' });
    router.push('/koie/flåkoia');
    await flushPromises();

    const wrapper = createWrapper(Koie, {
      router,
    });

    const spy = jest.spyOn(wrapper.vm.$router, 'push');
    const responseObj = {
      data: { koie: { name: 'flåkoia', description: { description_eng: '' }, location: { terrain_eng: '' } } },
    };
    mockAxios.mockResponse(responseObj);
    await flushPromises();
    wrapper.find('[data-test="bookBtn"]').trigger('click');

    expect(spy).toHaveBeenCalledWith('/booking/flåkoia');
  });

  // This is a very important function of the app
  it('BookBtn disabled when disableBooking is true', async () => {
    const router = new VueRouter({ routes, mode: 'abstract' });
    router.push('/koie/flåkoia');
    await flushPromises();

    const wrapper = createWrapper(Koie, {
      router,
      computed: {
        disableBooking() {
          return true;
        },
      },
    });

    const responseObj = {
      data: { koie: { name: 'flåkoia', description: { description_eng: '' }, location: { terrain_eng: '' } } },
    };
    mockAxios.mockResponse(responseObj);
    await flushPromises();

    const bookBtn = wrapper.find('[data-test="bookBtn"]');

    expect(bookBtn.props().disabled).toBe(true);
  });
});
