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
    expect(wrapper.contains('-1')).toBe(true);
  });
});
