import Vue, { VueConstructor } from 'vue';
import Vuetify, { Vuetify as VuetifyType } from 'vuetify';
import scssVars from '@/styles/variables.scss';
import mockAxios from 'jest-mock-axios';

Vue.use(Vuetify);

// Utilities
import { mount, createLocalVue, shallowMount } from '@vue/test-utils';

// Components or views
import DateSkippers from '@/components/admin/allCabinsView/DateSkippers.vue';
import dayjs from 'dayjs';
import { Store } from 'vuex';
import { RootState } from '@/store/types';

describe('Component DateSkippers.vue', () => {
  let localVue: VueConstructor<Vue>;
  let vuetify: VuetifyType;
  let store: Store<RootState>;

  beforeEach(() => {
    localVue = createLocalVue();
    vuetify = new Vuetify();
    localVue.use(Vuetify);
    localVue.prototype.$scssVars = scssVars;
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('Mounts the component', () => {
    const wrapper = mount(DateSkippers);
    expect(wrapper.isVueInstance).toBeTruthy();
  });

  it('Matches snapshot', () => {
    const wrapper = mount(DateSkippers);
    expect(wrapper).toMatchSnapshot();
  });

  it('Renders only negative menu', () => {
    const wrapper = mount(DateSkippers, { propsData: { menuVersion: 'NEGATIVE' } });
    const labels = ['-1 å', '-1 m', '-1 u', '-1 d'];
    for (const label of labels) {
      const button = wrapper.find({ ref: label });
      expect(button.exists()).toBeTruthy();
    }
  });

  it('Renders only positive menu', () => {
    const wrapper = mount(DateSkippers, { propsData: { menuVersion: 'NEGATIVE' } });
    const labels = ['+1 å', '+1 m', '+1 u', '+1 d'];
    for (const label of labels) {
      const button = wrapper.find({ ref: label });
      expect(button.exists()).toBeTruthy();
    }
  });

  it('Skip button calls skipDates with correct argument', () => {
    const skipDates = jest.fn();
    const wrapper = mount(DateSkippers, {
      localVue,
      vuetify,
      methods: {
        skipDates: skipDates,
      },
      propsData: { menuVersion: 'ALL' },
    });
    const expectedArguments: { label: string; howMany: number; what: dayjs.OpUnitType }[] = [
      {
        label: '-1 å',
        howMany: -1,
        what: 'year',
      },
      {
        label: '-1 m',
        howMany: -1,
        what: 'month',
      },
      {
        label: '-1 u',
        howMany: -1,
        what: 'week',
      },
      {
        label: '-1 d',
        howMany: -1,
        what: 'day',
      },
      {
        label: '+1 d',
        howMany: +1,
        what: 'day',
      },
      {
        label: '+1 u',
        howMany: +1,
        what: 'week',
      },
      {
        label: '+1 m',
        howMany: +1,
        what: 'month',
      },
      {
        label: '+1 å',
        howMany: +1,
        what: 'year',
      },
    ];

    for (const argument of expectedArguments) {
      const button = wrapper.find({ ref: argument.label });
      button.trigger('click');
      expect(skipDates).toHaveBeenLastCalledWith(argument.howMany, argument.what);
    }
  });
});
