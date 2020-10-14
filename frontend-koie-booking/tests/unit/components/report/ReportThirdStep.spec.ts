import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

// Utilities
import { Wrapper, ThisTypedShallowMountOptions } from '@vue/test-utils';
import { createWrapper } from '../../utils';

// Components or views
import ReportThirdStep from '@/components/report/ReportThirdStep.vue';

describe('Component ReportThirdStep.vue', () => {
  let wrapper: Wrapper<any>;
  let wrapperOptions: ThisTypedShallowMountOptions<any>;

  beforeEach(() => {
    wrapperOptions = {};
    wrapper = createWrapper(ReportThirdStep, wrapperOptions);
  });

  it('Matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
