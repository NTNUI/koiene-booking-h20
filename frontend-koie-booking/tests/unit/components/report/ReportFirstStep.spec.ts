import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

// Utilities
import { Wrapper, ThisTypedShallowMountOptions } from '@vue/test-utils';
import { createShallowWrapper } from '../../utils';

// Components or views
import ReportFirstStep from '@/components/report/ReportFirstStep.vue';

describe('Component ReportFirstStep.vue', () => {
  let wrapper: Wrapper<any>;
  let wrapperOptions: ThisTypedShallowMountOptions<any>;

  beforeEach(() => {
    wrapperOptions = {
      mocks: {
        $route: {
          params: { id: 1 },
        },
      },
    };

    wrapper = createShallowWrapper(ReportFirstStep, wrapperOptions);
  });

  it('Matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
