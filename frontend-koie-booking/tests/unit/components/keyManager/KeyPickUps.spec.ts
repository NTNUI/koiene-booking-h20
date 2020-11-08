import Vue from 'vue';
import Vuetify from 'vuetify';
import { createShallowWrapper } from '../../utils';
import KeyPickUps from '@/components/keyManager/KeyPickUps.vue';
import dayjs from 'dayjs';

Vue.use(Vuetify);

describe('Component KeyPickUps', () => {
  it('Matches snapshot', () => {
    const wrapper = createShallowWrapper(KeyPickUps);
    expect(wrapper).toMatchSnapshot();
  });

  it('Shows red color for trips that already has started', () => {
    const wrapper = createShallowWrapper(KeyPickUps);
    const startDate = dayjs()
      .subtract(1, 'day')
      .format('YYYY-MM-DD');
    expect(wrapper.vm.getColorForPickUp(startDate)).toStrictEqual({ color: '#FF5722' });
  });

  it("Shows white color for trips that hasn't started", () => {
    const wrapper = createShallowWrapper(KeyPickUps);
    const startDate = dayjs()
      .add(1, 'day')
      .format('YYYY-MM-DD');
    expect(wrapper.vm.getColorForPickUp(startDate)).toStrictEqual({ color: 'white' });
  });
});
