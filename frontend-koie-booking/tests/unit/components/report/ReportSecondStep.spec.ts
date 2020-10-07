import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import { storeConfig } from '@/store';
import { cloneDeep } from 'lodash';
import i18n from '@/i18n';
import scssVars from '@/styles/variables.scss';

Vue.use(Vuetify);

// Utilities
import { mount, createLocalVue } from '@vue/test-utils';

// Components or views
import ReportSecondStep from '@/components/report/ReportSecondStep.vue';

describe('Component ReportSecondStep.vue', () => {
  let wrapper: any;
  let localVue: any;
  let vuetify: any;
  let mockStore: any;

  beforeEach(() => {
    localVue = createLocalVue();
    vuetify = new Vuetify();
    localVue.use(Vuetify);
    localVue.use(Vuex);
    mockStore = { commit: jest.fn() };
    localVue.prototype.$scssVars = scssVars;

    wrapper = mount(ReportSecondStep, {
      localVue,
      vuetify,
      i18n,
      mocks: {
        $store: mockStore,
      },
    });
  });

  it('Matches snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('Changing gas to empty commits to store correctly', () => {
    wrapper.find('[data-test="btnGasEmpty"]').trigger('click');
    expect(mockStore.commit).toHaveBeenCalledWith('report/setGasIsFull', false);
  });
});
