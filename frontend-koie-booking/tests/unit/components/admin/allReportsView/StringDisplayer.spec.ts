import Vue from 'vue';
import Vuetify from 'vuetify';
import { createShallowWrapper } from '../../../utils';
import { Wrapper } from '@vue/test-utils';

import StringDisplayer from '@/components/admin/allReportsView/StringDisplayer.vue';
import ReportDetailModal from '@/components/admin/allReportsView/ReportDetailModal.vue';

Vue.use(Vuetify);

describe('Component StringDisplayer', () => {
  let wrapper: Wrapper<any>;

  beforeEach(() => {
    const wrapperOptions = {
      propsData: {
        text: 'Example text',
        clickable: true,
        title: 'Example title',
      },
      data() {
        return { showDialog: true };
      },
    };
    wrapper = createShallowWrapper(StringDisplayer, wrapperOptions);
  });

  it('Matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Closes dialog', () => {
    wrapper.vm.closeDialog();

    expect(wrapper.vm.showDialog).toBeFalsy();
  });

  it('Shows default values when no inputs are given', () => {
    wrapper = createShallowWrapper(StringDisplayer);
    expect(wrapper.vm.text).toEqual('');
    expect(wrapper.vm.clickable).toEqual(false);
    expect(wrapper.vm.title).toEqual('');
  });

  it('Click handler is called when StringDisplayer is clicked', () => {
    const clickHandler = jest.fn();
    const wrapperOptions = {
      propsData: {
        text: 'Example text',
        clickable: true,
        title: 'Example title',
      },
      methods: {
        clickHandler,
      },
    };
    wrapper = createShallowWrapper(StringDisplayer, wrapperOptions);
    const stringDisplayer = wrapper.find({ ref: 'stringDisplayerClickHandler' });
    stringDisplayer.trigger("click")

    expect(clickHandler).toHaveBeenCalled()
  });

  it('Does not show dialog when clickable is false', () => {
    const wrapperOptions = {
      propsData: {
        clickable: false,
      },
    };
    wrapper = createShallowWrapper(StringDisplayer, wrapperOptions);

    wrapper.vm.clickHandler();

    expect(wrapper.vm.showDialog).toBeFalsy();
  });

  it('Shows dialog when clickable is true', () => {
    wrapper.vm.clickHandler();

    expect(wrapper.vm.showDialog).toBeTruthy();
  });
});
