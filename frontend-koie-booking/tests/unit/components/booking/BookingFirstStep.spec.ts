import Vue from 'vue';
import Vuetify from 'vuetify';
import flushPromises from 'flush-promises';
import mockAxios from 'jest-mock-axios';

Vue.use(Vuetify);
// Components or views
import BookingFirstStep from '@/components/booking/BookingFirstStep.vue';
import { createWrapper } from '../../utils';

describe('Component BookingFirstStep.vue', () => {
  it('Matches snapshot', async () => {
    const wrapper = createWrapper(BookingFirstStep, {
      mocks: {
        $route: {
          params: { id: 'flåkoia' },
        },
      },
    });

    const responseObj = { data: { koie: { name: 'flåkoia' } } };
    mockAxios.mockResponse(responseObj);
    await flushPromises();

    expect(wrapper).toMatchSnapshot();
  });
});
