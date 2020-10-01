import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import i18n from '@/i18n';

Vue.use(Vuetify);

// Utilities
import { mount, createLocalVue } from '@vue/test-utils';

// Components or views
import ReportFirstStep from '@/components/report/ReportFirstStep.vue';

describe('Component ReportFirstStep.vue', () => {
  let wrapper: any;
  let localVue: any;
  let vuetify: any;

  beforeEach(() => {
    localVue = createLocalVue();
    vuetify = new Vuetify();
    localVue.use(Vuetify);
    localVue.use(Vuex);
  });

  it('Matches snapshot', async () => {
    wrapper = mount(ReportFirstStep, {
      localVue,
      vuetify,
      i18n,
    });

    expect(wrapper).toMatchSnapshot();
  });
});
