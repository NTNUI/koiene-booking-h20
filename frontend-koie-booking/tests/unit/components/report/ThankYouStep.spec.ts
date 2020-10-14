import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

// Utilities
import { Wrapper, ThisTypedShallowMountOptions } from '@vue/test-utils';
import { createWrapper } from '../../utils';

// Components or views
import ThankYouStep from '@/components/report/ThankYouStep.vue';

describe('Component ThankYouStep.vue', () => {
  let wrapper: Wrapper<any>;
  let wrapperOptions: ThisTypedShallowMountOptions<any>;

  beforeEach(() => {
    wrapperOptions = {};
    wrapper = createWrapper(ThankYouStep, wrapperOptions);
  });

  it('Matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
