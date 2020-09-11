import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'AllKoier',
    component: () => import(/* webpackChunkName: "about" */ '../views/AllKoier.vue'),
    meta: { requiresAuth: false, requiresAdmin: false }
  },
  {
    path: '/koie/:id',
    name: 'koie',
    component: () => import('../views/Koie.vue'),
    props: true,
    meta: { requiresAuth: false, requiresAdmin: false }
  },
  {
    path: '/booking/:id',
    name: 'booking',
    component: () => import('../views/Booking.vue'),
    meta: { requiresAuth: true, requiresAdmin: false }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { requiresAuth: false, requiresAdmin: false }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  }
];

const router = new VueRouter({
  routes
});

export function beforeEach(to: any, from: any, next: any) {
  const isLoggedIn = store.getters['auth/isLoggedIn'];
  const isAdmin = store.getters['auth/isAdmin'];
  const requiresAuth = to.matched.some((record: any) => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some((record: any) => record.meta.requiresAdmin);

  if (requiresAdmin && !isAdmin) next({ name: 'Login', query: { redirect: to.path } });
  else if (requiresAuth && !isLoggedIn) next({ name: 'Login', query: { redirect: to.path } });
  else if (to.name === 'Login' && isLoggedIn) next('/');
  else next();
}

router.beforeEach((to, from, next) => beforeEach(to, from, next));

export default router;
export { routes };
