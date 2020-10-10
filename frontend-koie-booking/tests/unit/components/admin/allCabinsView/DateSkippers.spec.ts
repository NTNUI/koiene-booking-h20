import Vue, { VueConstructor } from 'vue';
import Vuetify, { Vuetify as VuetifyType } from 'vuetify';

Vue.use(Vuetify);

// Components or views
import DateSkippers from '@/components/admin/allCabinsView/DateSkippers.vue';
import dayjs from 'dayjs';
import { createWrapper } from '../../../utils';
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

describe('Component DateSkippers.vue', () => {
  it('Mounts the component', () => {
    const wrapper = createWrapper(DateSkippers);
    expect(wrapper.isVueInstance).toBeTruthy();
  });

  it('Matches snapshot', () => {
    const wrapper = createWrapper(DateSkippers);
    expect(wrapper).toMatchSnapshot();
  });

  it('Renders only negative menu', () => {
    const wrapper = createWrapper(DateSkippers, { propsData: { menuVersion: 'NEGATIVE' } });
    for (const argument of expectedArguments.slice(0, 4)) {
      const button = wrapper.find({ ref: argument.label });
      expect(button.exists()).toBeTruthy();
    }
    for (const argument of expectedArguments.slice(4)) {
      const button = wrapper.find({ ref: argument.label });
      expect(button.exists()).toBeFalsy();
    }
  });

  it('Renders only positive menu', () => {
    const wrapper = createWrapper(DateSkippers, { propsData: { menuVersion: 'POSITIVE' } });
    for (const argument of expectedArguments.slice(0, 4)) {
      const button = wrapper.find({ ref: argument.label });
      expect(button.exists()).toBeFalsy();
    }
    for (const argument of expectedArguments.slice(4)) {
      const button = wrapper.find({ ref: argument.label });
      expect(button.exists()).toBeTruthy();
    }
  });

  it('Skip button calls skipDates with correct argument', () => {
    const skipDates = jest.fn();
    const wrapper = createWrapper(DateSkippers, {
      methods: {
        skipDates: skipDates,
      },
      propsData: { menuVersion: 'ALL' },
    });

    for (const argument of expectedArguments) {
      const button = wrapper.find({ ref: argument.label });
      button.trigger('click');
      expect(skipDates).toHaveBeenLastCalledWith(argument.howMany, argument.what);
    }
  });
});
