import { Wrapper } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import mockAxios from 'jest-mock-axios';

// Utilities
import { mount, ThisTypedShallowMountOptions } from '@vue/test-utils';

// Components or views
import Report from '@/views/Report.vue';
import ReportFirstStep from '@/components/report/ReportFirstStep.vue';
import ReportSecondStep from '@/components/report/ReportSecondStep.vue';
import { createShallowWrapper } from '../utils';

describe('View Booking.vue', () => {
  // Router not needed for this test-suite
  let wrapper: Wrapper<any>;
  let wrapperOptions: ThisTypedShallowMountOptions<any>;

  beforeEach(async () => {
    wrapperOptions = {
      mocks: {
        $route: {
          params: { id: 1 },
        },
      },
    };

    wrapper = createShallowWrapper(Report, wrapperOptions);

    const response = { data: { booking: {} } };
    mockAxios.mockResponse(response);
    await flushPromises();
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('Matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Buttons should be hidden if report is loading', () => {
    expect(wrapper.vm.$el.querySelector('.btnWrapper').style.display).toBe('');
    wrapperOptions = {
      mocks: {
        $route: {
          params: { id: 1 },
        },
        computed: {
          isLoading() {
            return true;
          },
        },
      },
    };
    wrapper = createShallowWrapper(Report, wrapperOptions);
    expect(wrapper.vm.$el.querySelector('.btnWrapper').style.display).toBe('none');
  });

  it('Buttons should be hidden if there is an api error', () => {
    expect(wrapper.vm.$el.querySelector('.btnWrapper').style.display).toBe('');
    wrapperOptions = {
      mocks: {
        $route: {
          params: { id: 1 },
        },
        computed: {
          apiError() {
            return true;
          },
        },
      },
    };
    wrapper = createShallowWrapper(Report, wrapperOptions);
    expect(wrapper.vm.$el.querySelector('.btnWrapper').style.display).toBe('none');
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
