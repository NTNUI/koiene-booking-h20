import Vue from 'vue';
import Vuetify from 'vuetify';
import { createShallowWrapper, createWrapper } from '../../utils';
import { keyPickUpStatusOptions } from '@/components/keyManager/keyStatusOptions';
import KEY_STATUS from '@/types/keyManager/KeyStatus';
import KeyStatusSelector from '@/components/keyManager/KeyStatusSelector.vue';

Vue.use(Vuetify);

describe('Component KeyStatusSelector', () => {
  const wrapperOptions = {
    propsData: {
      items: keyPickUpStatusOptions,
      status: String(KEY_STATUS.PICKED_UP),
    },
  };

  it('Matches snapshot', () => {
    const wrapper = createShallowWrapper(KeyStatusSelector, wrapperOptions);
    expect(wrapper).toMatchSnapshot();
  });

  it('Uses default items when no props are given', () => {
    const wrapper = createShallowWrapper(KeyStatusSelector);
    expect(wrapper.vm.items).toEqual({});
  });

  it('updateStatus returns without error if no StatusOption match selectedStatus', () => {
    const wrapper = createWrapper(KeyStatusSelector, wrapperOptions);

    wrapper.vm.updateStatus('test');
    expect(wrapper.vm.backgroundColor).toEqual('');
  });

  it('updateStatus updates backgroundColor to correct color', () => {
    const wrapper = createWrapper(KeyStatusSelector, wrapperOptions);

    wrapper.vm.updateStatus(KEY_STATUS.NOT_PICKED_UP);

    expect(wrapper.vm.backgroundColor).toEqual(keyPickUpStatusOptions[KEY_STATUS.NOT_PICKED_UP].color);
  });
});
