import Vue, { VueConstructor } from 'vue';
import Vuetify, { Vuetify as VuetifyType } from 'vuetify';
import scssVars from '@/styles/variables.scss';
import mockAxios from 'jest-mock-axios';

Vue.use(Vuetify);

// Utilities
import { mount, createLocalVue, Wrapper } from '@vue/test-utils';

// Components or views
import CabinCapacity from '@/components/admin/allCabinsView/CabinCapacity.vue';

describe('Component CabinCapacity.vue', () => {
  let localVue: VueConstructor<Vue>;
  let vuetify: VuetifyType;

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
    const wrapper = mount(CabinCapacity);
    expect(wrapper.isVueInstance).toBeTruthy();
  });

  it('Displays red when no beds available', () => {
    const wrapper: any = mount(CabinCapacity, {
      propsData: {
        availableBeds: 0,
        numberOfBeds: 2,
      },
    });

    expect(wrapper.vm.style.background).toBe('red');
  });

  it('Displays green when all beds available', () => {
    const wrapper: any = mount(CabinCapacity, {
      propsData: {
        availableBeds: 2,
        numberOfBeds: 2,
      },
    });

    expect(wrapper.vm.style.background).toBe('green');
  });

  it('Handles no input props', () => {
    const wrapper: any = mount(CabinCapacity, {});
    expect(wrapper.vm.numberOfBeds).toEqual(0);
    expect(wrapper.vm.availableBeds).toEqual(0);
  });

  it('Renders gradient yellow when some beds are available', () => {
    let testAvailableBeds = 1;
    let testNumberOfBeds = 2;
    const wrapper: any = mount(CabinCapacity, {
      propsData: {
        availableBeds: 1,
        numberOfBeds: 2,
      },
    });
    let calculatedProgress = Math.floor((testAvailableBeds / testNumberOfBeds) * 100);
    let expectedGradient =
      'linear-gradient(-90deg, green, green ' + calculatedProgress + '%, yellow ' + calculatedProgress + '%)';

    expect(wrapper.vm.style.background).toBe(expectedGradient);
  });
});
