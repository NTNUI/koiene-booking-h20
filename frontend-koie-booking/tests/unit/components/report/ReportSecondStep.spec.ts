import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

// Utilities
import { Wrapper, ThisTypedShallowMountOptions } from '@vue/test-utils';
import { createWrapper } from '../../utils';

// Components or views
import ReportSecondStep from '@/components/report/ReportSecondStep.vue';

describe('Component ReportSecondStep.vue', () => {
  let wrapper: Wrapper<any>;
  let wrapperOptions: ThisTypedShallowMountOptions<any>;

  beforeEach(() => {
    // We need this in order to solve a v-slider bug causing a
    // warning https://github.com/vuetifyjs/vuetify/issues/1210#issuecomment-319624495
    const app = document.createElement('div');
    app.setAttribute('data-app', 'true');
    document.body.appendChild(app);

    wrapperOptions = {};
    wrapper = createWrapper(ReportSecondStep, wrapperOptions);
  });

  it('Matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
