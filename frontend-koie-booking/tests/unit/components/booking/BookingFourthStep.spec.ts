import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

// Components or views
import BookingFourthStep from '@/components/booking/BookingFourthStep.vue';
import { createWrapper } from '../../utils';

describe('Component BookingFourthStep.vue', () => {
  it('Matches snapshot', async () => {
    const wrapper = createWrapper(BookingFourthStep);

    expect(wrapper).toMatchSnapshot();
  });
});
