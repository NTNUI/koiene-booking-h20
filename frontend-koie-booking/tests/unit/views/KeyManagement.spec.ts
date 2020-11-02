import Vue from 'vue';
import Vuetify from 'vuetify';
import { createShallowWrapper } from '../utils';
import KeyManagement from '@/views/KeyManagement.vue';

Vue.use(Vuetify);

describe('View KeyManagement.vue', () => {
  it('Matches snapshot', () => {
    const wrapper = createShallowWrapper(KeyManagement);
    expect(wrapper).toMatchSnapshot();
  });
});
