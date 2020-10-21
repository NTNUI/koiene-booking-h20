import Vue from 'vue';
import Vuetify from 'vuetify';
import { createWrapper } from '../../../utils';
import { Wrapper } from '@vue/test-utils';

import ReportRow from '@/components/admin/allReportsView/ReportRow.vue';
import { getReport } from '../../../__mocks__/reports';
import { convertAPIReportToAdminReport } from '@/store/modules/admin/reports/helpers';
import scssVars from '@/styles/variables.scss'
Vue.use(Vuetify);

describe('Component ReportRow', () => {
  let wrapper: Wrapper<any>;

  beforeEach(() => {
    const report = convertAPIReportToAdminReport(getReport());
    const wrapperOptions = {
      propsData: {
        report,
      },
    };
    wrapper = createWrapper(ReportRow, wrapperOptions);
  });

  it('Matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Gets correct color and text for chip', () => {
    const colorAndText = wrapper.vm.getCorrectColorAndText("gasIsFull")
    expect(colorAndText).toEqual({text: 'Tomt', color: scssVars.globalColorRedStrong})
  });

  it('Gets shows error chip for wrong input', () => {
    const colorAndText = wrapper.vm.getCorrectColorAndText("This input is wrong")
    expect(colorAndText).toEqual({text: 'Feil ved lesing', color: '#8E24AA'})
  });
});
