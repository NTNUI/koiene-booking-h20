import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import { storeConfig } from '@/store';
import { cloneDeep } from 'lodash';
import i18n from '@/i18n';
import scssVars from '@/styles/variables.scss';

Vue.use(Vuetify);

// Utilities
import { mount, createLocalVue } from '@vue/test-utils';

// Components or views
import Report from '@/views/Report.vue';
import ReportFirstStep from '@/components/report/ReportFirstStep.vue';
import ReportSecondStep from '@/components/report/ReportSecondStep.vue';

describe('View Booking.vue', () => {
  // Router not needed for this test-suite
  let wrapper: any;
  let localVue: any;
  let vuetify: any;
  let store: any;

  beforeEach(() => {
    localVue = createLocalVue();
    vuetify = new Vuetify();
    localVue.use(Vuetify);
    localVue.use(Vuex);
    // Hard resets the store between tests
    store = new Vuex.Store(cloneDeep(storeConfig));
    localVue.prototype.$scssVars = scssVars;

    wrapper = mount(Report, {
      localVue,
      vuetify,
      i18n,
      store,
      mocks: {
        $route: {
          params: { id: 1 },
        },
      },
    });
  });

  it('Matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Button_next renders next report step', () => {
    wrapper.find('[data-test="btnNext"]').trigger('click');

    expect(wrapper.contains(ReportSecondStep)).toBe(true);
    expect(wrapper.contains(ReportFirstStep)).toBe(false);
  });

  it('Button_prev renders prev report step', () => {
    wrapper.find('[data-test="btnNext"]').trigger('click');
    wrapper.find('[data-test="btnPrev"]').trigger('click');

    expect(wrapper.contains(ReportFirstStep)).toBe(true);
    expect(wrapper.contains(ReportSecondStep)).toBe(false);
  });
});
