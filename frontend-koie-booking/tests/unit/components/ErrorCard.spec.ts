import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);
// Components or views
import ErrorCard from '../../../src/components/ErrorCard.vue';
import { createWrapper } from '../utils';

describe('Component ErrorCard.vue', () => {
  it('Matches snapshot', async () => {
    const wrapper = createWrapper(ErrorCard);

    expect(wrapper).toMatchSnapshot();
  });
});
