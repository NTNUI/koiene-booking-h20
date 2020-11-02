import Vue from 'vue';
import Vuetify from 'vuetify';
import { createShallowWrapper } from '../../utils';
import KeyTable from '@/components/keyManager/KeyTable.vue';
import dayjs from 'dayjs';
import { Wrapper } from '@vue/test-utils';
import { getKeyPickUps } from '../../__mocks__/keys';

Vue.use(Vuetify);

describe('Component KeyTable', () => {
  it('Matches snapshot', () => {
    const wrapperOptions = {
      propsData: {
        title: 'Test',
        description: 'Test table',
        items: getKeyPickUps(),
        loading: false,
      },
    };
    const wrapper = createShallowWrapper(KeyTable, wrapperOptions) as Wrapper<KeyTable>;
    expect(wrapper).toMatchSnapshot();
  });
  it('Defaults to empty array when no items are provided', () => {
    const wrapperOptions = {
      propsData: {
        title: 'Test',
        description: 'Test table',
        loading: false,
      },
    };
    const wrapper = createShallowWrapper(KeyTable, wrapperOptions);
    expect(wrapper.vm.items).toEqual([]);
  });
});
