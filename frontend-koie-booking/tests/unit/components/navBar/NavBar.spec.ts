import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import { storeConfig } from '@/store';
import { cloneDeep } from 'lodash';

Vue.use(Vuetify);

// Components or views

import NavBar from '@/components/navBar/NavBar.vue';
import NavBarAdmin from '@/components/navBar/NavBarAdmin.vue';
import { createWrapper } from '../../utils';
import VueRouter from 'vue-router';
import { routes } from '@/router';
const router = new VueRouter({ routes, mode: 'abstract' });

describe('Component NavBar.vue', () => {
  it('Matches snapshot', async () => {
    const wrapper = createWrapper(NavBar, { router });

    expect(wrapper).toMatchSnapshot();
  });

  it('Admin button pushes the router to /admin', () => {
    // Arrange
    const store = new Vuex.Store(cloneDeep(storeConfig));
    store.commit('auth/setAdmin', true);
    store.commit('auth/setToken', { access: 'testToken' });
    const wrapper = createWrapper(NavBar, {
      store,
      router,
    });
    const spy = jest.spyOn(wrapper.vm.$router, 'push');

    // Act
    wrapper.find('#navBarAdminButton').trigger('click');

    // Assert
    expect(spy).toHaveBeenCalledWith('/admin');
  });

  it('Admin can see admin button if logged in', () => {
    // Arrange
    const store = new Vuex.Store(cloneDeep(storeConfig));

    store.commit('auth/setAdmin', true);
    store.commit('auth/setToken', { access: 'testToken' });

    // Act
    const wrapper = createWrapper(NavBar, { store, router });

    //Assert
    expect(wrapper.contains(NavBarAdmin)).toBe(true);
  });

  it("User can't see admin button if not admin but logged in", () => {
    // Arrange
    const store = new Vuex.Store(cloneDeep(storeConfig));

    store.commit('auth/setToken', { access: 'testToken' });
    store.commit('auth/setAdmin', false);

    // Act
    const wrapper = createWrapper(NavBar, { store, router });

    // Assert
    expect(wrapper.contains(NavBarAdmin)).toBe(false);
  });

  it("Admin can't see admin button if not logged in", () => {
    // Arrange
    const store = new Vuex.Store(cloneDeep(storeConfig));
    store.commit('auth/setAdmin', true);

    // Act
    const wrapper = createWrapper(NavBar, {
      store,
      router,
    });

    // Assert
    expect(wrapper.contains(NavBarAdmin)).toBe(false);
  });
});
