import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

// Components or views
import BookingThirdStep from '@/components/booking/BookingThirdStep.vue';
import { createWrapper } from '../../utils';

describe('Component BookingThirdStep.vue', () => {
  it('Matches snapshot', async () => {
    const wrapper = createWrapper(BookingThirdStep, {
      computed: {
        price() {
          return 120;
        },
      },
      stubs: ['Card'],
    });

    expect(wrapper).toMatchSnapshot();
  });
});
