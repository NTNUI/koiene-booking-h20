import Vue from 'vue';
import Vuetify from 'vuetify';
import flushPromises from 'flush-promises';
import mockAxios from 'jest-mock-axios';

Vue.use(Vuetify);

// Components or views
import Booking from '@/views/Booking.vue';
import BookingFirstStep from '@/components/booking/BookingFirstStep.vue';
import BookingSecondStep from '@/components/booking/BookingSecondStep.vue';
import { createWrapper } from '../utils';

describe('View Booking.vue', () => {
  it('Matches snapshot', async () => {
    const wrapper = createWrapper(Booking, {
      propsData: {
        allKoier: false,
        row: false,
      },
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

  it('Button_next renders next bookingStep', async () => {
    const wrapper = createWrapper(Booking, {
      propsData: {
        allKoier: false,
        row: false,
      },
      mocks: {
        $route: {
          params: { id: 'flåkoia' },
        },
      },
    });

    const responseObj = { data: { koie: { name: 'flåkoia' } } };
    mockAxios.mockResponse(responseObj);
    await flushPromises();

    wrapper.find('[data-test="btnNext"]').trigger('click');

    expect(wrapper.contains(BookingSecondStep)).toBe(true);
    expect(wrapper.contains(BookingFirstStep)).toBe(false);
  });

  it('Button_prev renders prev bookingStep', async () => {
    const wrapper = createWrapper(Booking, {
      propsData: {
        allKoier: false,
        row: false,
      },
      mocks: {
        $route: {
          params: { id: 'flåkoia' },
        },
      },
    });

    const responseObj = { data: { koie: { name: 'flåkoia' } } };
    mockAxios.mockResponse(responseObj);
    await flushPromises();

    wrapper.find('[data-test="btnNext"]').trigger('click');
    wrapper.find('[data-test="btnPrev"]').trigger('click');
    await flushPromises();

    expect(wrapper.contains(BookingFirstStep)).toBe(true);
    expect(wrapper.contains(BookingSecondStep)).toBe(false);
  });
});
