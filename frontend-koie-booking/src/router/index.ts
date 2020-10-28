import Vue from 'vue';
import VueRouter, { Route } from 'vue-router';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'AllKoier',
    component: () => import(/* webpackChunkName: "about" */ '@/views/AllKoier.vue'),
    meta: { requiresAuth: false, requiresAdmin: false, requiresKeyManager: false },
  },
  {
    path: '/koie/:id',
    name: 'koie',
    component: () => import('@/views/Koie.vue'),
    props: true,
    meta: { requiresAuth: false, requiresAdmin: false, requiresKeyManager: false },
  },
  {
    path: '/booking/:id',
    name: 'booking',
    component: () => import('@/views/Booking.vue'),
    meta: { requiresAuth: true, requiresAdmin: false, requiresKeyManager: false },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { requiresAuth: false, requiresAdmin: false, requiresKeyManager: false },
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/Admin.vue'),
    meta: { requiresAuth: true, requiresAdmin: true, requiresKeyManager: false },
  },
  {
    path: '/report/:booking_uuid',
    name: 'Report',
    component: () => import('@/views/Report.vue'),
    meta: { requiresAuth: true, requiresAdmin: false, requiresKeyManager: false },
  },
  {
    path: '/key_management',
    name: 'KeyManagement',
    component: () => import('@/views/KeyManagement.vue'),
    meta: { requiresAuth: true, requiresAdmin: false, requiresKeyManager: true },
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export function beforeEach(to: Route, from: Route, next: any) {
  const isLoggedIn = store.getters['auth/isLoggedIn'];
  const isAdmin = store.getters['auth/isAdmin'];
  const isKeyManager = store.getters['auth/isKeyManager'];
  const requiresAuth = to.matched.some((record: any) => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some((record: any) => record.meta.requiresAdmin);
  const requiresKeyManager = to.matched.some((record: any) => record.meta.requiresKeyManager);

  if (requiresAdmin && !isAdmin) next({ name: 'Login', query: { redirect: to.path } });
  else if (requiresKeyManager && !isKeyManager) next({ name: 'Login', query: { redirect: to.path } });
  else if (isKeyManager && !isAdmin && isLoggedIn && to.name !== 'KeyManagement') next({ name: 'KeyManagement' });
  else if (requiresAuth && !isLoggedIn) next({ name: 'Login', query: { redirect: to.path } });
  else if (to.name === 'Login' && isKeyManager && !isAdmin && isLoggedIn) next('/key_management');
  else if (to.name === 'Login' && isLoggedIn) next('/');
  else next();
}

router.beforeEach((to, from, next) => beforeEach(to, from, next));

export default router;
export { routes };
