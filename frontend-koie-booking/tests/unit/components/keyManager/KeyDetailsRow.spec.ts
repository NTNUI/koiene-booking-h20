import Vue from 'vue';
import Vuetify from 'vuetify';
import { createShallowWrapper } from '../../utils';
import KeyDetailsRow from '@/components/keyManager/KeyDetailsRow.vue';
import { getKeyPickUps } from '../../__mocks__/keys';

Vue.use(Vuetify);

describe('Component KeyDetailsRow', () => {
  const wrapperOptions = {
    propsData: {
      keyDetail: Object.values(getKeyPickUps())[0],
      isPickUp: false,
    },
  };

  it('Matches snapshot', () => {
    const wrapper = createShallowWrapper(KeyDetailsRow, wrapperOptions);
    expect(wrapper).toMatchSnapshot();
  });

  it('Handles no props without crashing', () => {
    const wrapper = createShallowWrapper(KeyDetailsRow);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('Renders PickUp field if pickup', () => {
    wrapperOptions.propsData.isPickUp = true;
    const wrapper = createShallowWrapper(KeyDetailsRow, wrapperOptions);
    expect(wrapper.find({ ref: 'pickUpStartDate' }).exists()).toBeTruthy();
  });

  it('getColorFn returns white if no props are provided', () => {
    const wrapper = createShallowWrapper(KeyDetailsRow);
    expect(wrapper.vm.getColorFn()).toEqual({ color: 'white' });
  });
});
