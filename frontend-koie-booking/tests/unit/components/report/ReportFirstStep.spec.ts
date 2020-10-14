import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

// Utilities
import { Wrapper, ThisTypedShallowMountOptions } from '@vue/test-utils';
import { createWrapper } from '../../utils';

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
        computed: {
          koie() {
            return 'Flåkoia';
          },
          fromDate() {
            return '01.01.1970';
          },
          toDate() {
            return '10.01.1970';
          },
        },
      },
    };

    wrapper = createWrapper(ReportFirstStep, wrapperOptions);
  });

  it('Matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
