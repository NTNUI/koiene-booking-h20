import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

// Components or views
import CabinCapacity from '@/components/admin/allCabinsView/CabinCapacity.vue';
import { createWrapper } from '../../../utils';
import scssVars from '@/styles/variables.scss';

describe('Component CabinCapacity.vue', () => {
  it('Mounts the component', () => {
    const wrapper = createWrapper(CabinCapacity);
    expect(wrapper.isVueInstance).toBeTruthy();
  });

  it('Displays red when no beds available', () => {
    const wrapper: any = createWrapper(CabinCapacity, {
      propsData: {
        availableBeds: 0,
        numberOfBeds: 2,
      },
    });

    expect(wrapper.vm.style.background).toBe(scssVars.globalColorRedStrong);
  });

  it('Displays green when all beds available', () => {
    const wrapper: any = createWrapper(CabinCapacity, {
      propsData: {
        availableBeds: 2,
        numberOfBeds: 2,
      },
    });

    expect(wrapper.vm.style.background).toBe(scssVars.globalColorGreenStrong);
  });

  it('Handles no input props', () => {
    const wrapper: any = createWrapper(CabinCapacity);
    expect(wrapper.vm.numberOfBeds).toEqual(0);
    expect(wrapper.vm.availableBeds).toEqual(0);
  });

  it('Renders gradient yellow when some beds are available', () => {
    let testAvailableBeds = 1;
    let testNumberOfBeds = 2;
    const wrapper: any = createWrapper(CabinCapacity, {
      propsData: {
        availableBeds: 1,
        numberOfBeds: 2,
      },
    });
    let calculatedProgress = Math.floor((testAvailableBeds / testNumberOfBeds) * 100);
    let expectedGradient =
      'linear-gradient(-90deg, ' +
      scssVars.globalColorGreenStrong +
      ', ' +
      scssVars.globalColorGreenStrong +
      ' ' +
      calculatedProgress +
      '%, ' +
      scssVars.globalColorYellow +
      ' ' +
      calculatedProgress +
      '%)';

    expect(wrapper.vm.style.background).toBe(expectedGradient);
  });
});
