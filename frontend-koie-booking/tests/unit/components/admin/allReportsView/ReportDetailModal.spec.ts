import Vue from 'vue';
import Vuetify from 'vuetify';
import { createWrapper } from '../../../utils';
import { Wrapper } from '@vue/test-utils';

import ReportDetailModal from '@/components/admin/allReportsView/ReportDetailModal.vue';
Vue.use(Vuetify);

describe('Component ReportDetailModal', () => {
  let wrapper: Wrapper<any>;
  let spy: any;

  beforeEach(() => {
    const wrapperOptions = {
      propsData: {
        showModal: true,
        title: 'test',
        closeModal: () => null,
      },
    };
    spy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    wrapper = createWrapper(ReportDetailModal, wrapperOptions);
  });

  it('Warns about missing [data-app]', () => {
    expect(spy).toBeCalledWith(
      '[Vuetify] Unable to locate target [data-app]\n' +
        '\n' +
        'found in\n' +
        '\n' +
        '---> <VDialog>\n' +
        '       <ReportDetailModal>\n' +
        '         <Root>'
    );
  });

  it('Matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Shows default values when no input is given', () => {
    wrapper = createWrapper(ReportDetailModal);
    expect(wrapper.vm.showModal).toBeTruthy();
    expect(wrapper.vm.closeModal()).toBeNull();
    expect(wrapper.vm.title).toBe('');
  });
});
