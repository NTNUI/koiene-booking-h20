import Vue from 'vue';
import Vuetify from 'vuetify';
import { createShallowWrapper } from '../../utils';
import KeyManagerOverview from '@/components/keyManager/KeyManagerOverview.vue';

Vue.use(Vuetify);

describe('Component KeyManagerOverview', () => {
  it('Matches snapshot', () => {
    const wrapper = createShallowWrapper(KeyManagerOverview);
    expect(wrapper).toMatchSnapshot();
  });
});
