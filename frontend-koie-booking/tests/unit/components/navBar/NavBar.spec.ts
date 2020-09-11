import Vue, { VueConstructor } from 'vue';
import Vuetify, { Vuetify as VuetifyType } from 'vuetify';
import VueRouter from 'vue-router';
import Vuex, { Store } from 'vuex';
import { storeConfig } from '@/store';
import { cloneDeep } from 'lodash';
import i18n from '@/i18n';
import scssVars from '@/styles/variables.scss';
import mockAxios from 'jest-mock-axios';
import { routes } from '@/router';

Vue.use(Vuetify);

// Utilities
import { mount, createLocalVue, Wrapper } from '@vue/test-utils';

// Components or views

import NavBar from '@/components/navBar/NavBar.vue';
import NavBarAdmin from '@/components/navBar/NavBarAdmin.vue';
import { RootState } from '@/store/types';

describe('Component NavBar.vue', () => {
  const router = new VueRouter({ routes, mode: 'abstract' });
  let wrapper: Wrapper<any>;
  let localVue: VueConstructor<Vue>;
  let vuetify: VuetifyType;
  let store: Store<RootState>;

  beforeEach(() => {
    localVue = createLocalVue();
    vuetify = new Vuetify();
    localVue.use(VueRouter);
    localVue.use(Vuetify);
    localVue.use(Vuex);
    // Hard resets the store between tests
    store = new Vuex.Store(cloneDeep(storeConfig));
    localVue.prototype.$scssVars = scssVars;
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('Matches snapshot', async () => {
    wrapper = mount(NavBar, {
      localVue,
      router,
      vuetify,
      i18n,
      store
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('Admin button pushes the router to /admin', () => {
    // Arrange
    store.commit('auth/setAdmin', true);
    store.commit('auth/setToken', { access: 'testToken' });
    wrapper = mount(NavBar, {
      localVue,
      router,
      vuetify,
      i18n,
      store
    });
    const spy = jest.spyOn(wrapper.vm.$router, 'push');

    // Act
    wrapper.find('#navBarAdminButton').trigger('click');

    // Assert
    expect(spy).toHaveBeenCalledWith('/admin');
  });

  it('Admin can see admin button if logged in', () => {
    // Arrange
    store.commit('auth/setAdmin', true);
    store.commit('auth/setToken', { access: 'testToken' });

    // Act
    wrapper = mount(NavBar, {
      localVue,
      router,
      vuetify,
      i18n,
      store
    });

    //Assert
    expect(wrapper.contains(NavBarAdmin)).toBe(true);
  });

  it("User can't see admin button if not admin but logged in", () => {
    // Arrange
    store.commit('auth/setToken', { access: 'testToken' });

    // Act
    wrapper = mount(NavBar, {
      localVue,
      router,
      vuetify,
      i18n,
      store
    });

    // Assert
    expect(wrapper.contains(NavBarAdmin)).toBe(false);
  });

  it("Admin can't see admin button if not logged in", () => {
    // Arrange
    store.commit('auth/setAdmin', true);

    // Act
    wrapper = mount(NavBar, {
      localVue,
      router,
      vuetify,
      i18n,
      store
    });

    // Assert
    expect(wrapper.contains(NavBarAdmin)).toBe(false);
  });
});
