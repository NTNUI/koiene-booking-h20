import Vue from 'vue';
import Vuetify from 'vuetify';
import flushPromises from 'flush-promises';
import mockAxios from 'jest-mock-axios';

Vue.use(Vuetify);

// Components or views
import AllKoier from '../../../src/views/AllKoier.vue';
import { createWrapper } from '../utils';
import VueRouter from 'vue-router';
import { routes } from '@/router';

describe('View AllKoier.vue', () => {
  it('Matches snapshot', async () => {
    const wrapper = createWrapper(AllKoier);

    const responseObj = {
      data: { koier: [{ name: 'flåkoia', number_of_beds: 10 }] },
    };
    mockAxios.mockResponse(responseObj);
    await flushPromises();

    expect(wrapper).toMatchSnapshot();
  });

  // This test is unnecessary, but serves as a good selector-example
  it('Displays card with text "flaakoia"', async () => {
    const wrapper = createWrapper(AllKoier);

    const responseObj = { data: { koier: [{ name: 'flåkoia', number_of_beds: 10 }] } };
    mockAxios.mockResponse(responseObj);

    const title = wrapper.find('[title="flåkoia"] > .v-card__title');

    await flushPromises();
    expect(title.text()).toBe('flåkoia');
  });

  it('Check routing to correct "Koie.vue"', async () => {
    const router = new VueRouter({ routes, mode: 'abstract' });
    const wrapper = createWrapper(AllKoier, { router });
    const spy = jest.spyOn(wrapper.vm.$router, 'push');
    const responseObj = { data: { koier: [{ name: 'flåkoia', number_of_beds: 10 }] } };
    mockAxios.mockResponse(responseObj);
    await flushPromises();

    wrapper.find('[title="flåkoia"]').trigger('click');

    expect(spy).toHaveBeenCalledWith('/koie/flåkoia');
  });
});
