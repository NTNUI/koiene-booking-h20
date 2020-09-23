describe('Router navigationGuard.vue', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('Redirect to login if needed', async () => {
    const to = {
      matched: [{ meta: { requiresAuth: true } }],
      path: '/booking/flåkoia'
    };
    jest.doMock('@/store', () => ({ getters: { 'auth/getToken': false } }));
    const { beforeEach } = require('@/router');
    const next = jest.fn();

    beforeEach(to, undefined, next);

    expect(next).toHaveBeenCalledWith({ name: 'Login', query: { redirect: to.path } });
  });

  it('Send to requested path if logged in ', async () => {
    const to = {
      matched: [{ meta: { requiresAuth: true, requiresAdmin: false } }],
      path: '/booking/flåkoia'
    };
    jest.doMock('@/store', () => ({ getters: { 'auth/isLoggedIn': true, 'auth/isAdmin': false } }));
    const { beforeEach } = require('@/router');
    const next = jest.fn();

    beforeEach(to, undefined, next);

    expect(next).toHaveBeenCalledWith();
  });
});
