import Vue, { createLocalVue, mount, shallowMount, ThisTypedShallowMountOptions, Wrapper } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import { cloneDeep } from 'lodash';
import { storeConfig } from '@/store';
import scssVars from '@/styles/variables.scss';
import i18n from '@/i18n';

export function createWrapper(component: any, additionalOptions?: ThisTypedShallowMountOptions<any>): Wrapper<Vue> {
  const options = mergeOptions(additionalOptions);
  return mount(component, options);
}

export function createShallowWrapper(component: any, additionalOptions?: ThisTypedShallowMountOptions<any>) {
  const options = mergeOptions(additionalOptions);
  return shallowMount(component, options);
}

function mergeOptions(additionalOptions?: any) {
  const localVue = createLocalVue();
  const vuetify = new Vuetify();
  localVue.use(Vuetify);
  localVue.use(Vuex);
  const store = new Vuex.Store(cloneDeep(storeConfig));
  localVue.prototype.$scssVars = scssVars;

  const baseOptions = {
    localVue,
    vuetify,
    store,
    i18n,
  };

  return { ...baseOptions, ...additionalOptions };
}
