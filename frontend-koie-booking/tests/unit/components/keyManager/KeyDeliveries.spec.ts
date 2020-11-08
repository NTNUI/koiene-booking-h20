import Vue from 'vue';
import Vuetify from 'vuetify';
import { createShallowWrapper } from '../../utils';
import dayjs from 'dayjs';
import KeyDeliveries from '@/components/keyManager/KeyDeliveries.vue';

Vue.use(Vuetify);

describe('Component KeyDeliveries', () => {
  it('Matches snapshot', () => {
    const wrapper = createShallowWrapper(KeyDeliveries);
    expect(wrapper).toMatchSnapshot();
  });

  it('Shows red color for trips that ended 7 days or more ago', () => {
    const wrapper = createShallowWrapper(KeyDeliveries);
    const endDate = dayjs()
      .subtract(8, 'day')
      .format('YYYY-MM-DD');
    expect(wrapper.vm.getColorForDelivery(endDate)).toStrictEqual({ color: '#FF5722' });
  });

  it('Shows white color for trips that ended less that 7 days ago', () => {
    const wrapper = createShallowWrapper(KeyDeliveries);
    const endDate = dayjs()
      .subtract(6, 'day')
      .format('YYYY-MM-DD');
    expect(wrapper.vm.getColorForDelivery(endDate)).toStrictEqual({ color: 'white' });
  });
});
