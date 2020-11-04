import Vue from 'vue';
import Vuetify from 'vuetify';
import { createShallowWrapper } from '../../../utils';
import { Wrapper } from '@vue/test-utils';

import EquipmentColumnDisplayer from '@/components/admin/allReportsView/EquipmentColumnDisplayer.vue';
import ReportDetailModal from '@/components/admin/allReportsView/ReportDetailModal.vue';

Vue.use(Vuetify);

describe('Component EquipmentColumnDisplayer', () => {
  let wrapper: Wrapper<any>;

  beforeEach(() => {
    const wrapperOptions = {
      propsData: {
        notOK: ['axe', 'hammer'],
        notSure: ['saw', 'saw_blade', 'spade'],
        ok: ['detergent'],
      },
      data() {
        return { showDialog: true };
      },
    };
    wrapper = createShallowWrapper(EquipmentColumnDisplayer, wrapperOptions);
  });

  it('Matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Shows dialog when notSureChip is clicked', () => {
    const notSureChip = wrapper.find({ ref: 'equipmentColumnDisplayerNotSureChip' });
    notSureChip.trigger('click');

    expect(wrapper.vm.showDialog).toBeTruthy();
  });

  it('Closes dialog', () => {
    wrapper.vm.closeDialog();

    expect(wrapper.vm.showDialog).toBeFalsy();
  });

  it('Shows modal when showDialog is true', () => {
    expect(wrapper.contains(ReportDetailModal)).toBeTruthy();
  });

  it('Shows default values when no inputs are given', () => {
    wrapper = createShallowWrapper(EquipmentColumnDisplayer);
    expect(wrapper.vm.notOk).toEqual([]);
    expect(wrapper.vm.notSure).toEqual([]);
    expect(wrapper.vm.ok).toEqual([]);
    expect(wrapper.vm.showDialog).toBeFalsy();
  });
});
