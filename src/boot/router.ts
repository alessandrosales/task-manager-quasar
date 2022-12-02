import { boot } from 'quasar/wrappers';

export default boot(async ({ router }) => {
  router.beforeEach((to, from, next) => {
    if (to.name !== 'login' && !localStorage.getItem('token')) {
      router.push({ name: 'login' });
    }
    next();
  });
});
