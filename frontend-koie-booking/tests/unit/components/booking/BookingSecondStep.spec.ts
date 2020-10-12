import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

// Components or views
import BookingSecondStep from '@/components/booking/BookingSecondStep.vue';
import { createWrapper } from '../../utils';

describe('Component BookingSecondStep.vue', () => {
  it('Matches snapshot', async () => {
    const wrapper = createWrapper(BookingSecondStep, {
      sync: false,
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('Calculate total price of 1x member, 2x non-member', async () => {
    const wrapper: any = createWrapper(BookingSecondStep, {
      data() {
        return {
          guests: [
            { name: '', number: '', email: '', isMember: true },
            { name: '', number: '', isMember: false },
            { name: '', number: '', isMember: false },
          ],
        };
      },
      sync: false,
    });

    expect(wrapper.vm.price).toBe(200);
  });
});
