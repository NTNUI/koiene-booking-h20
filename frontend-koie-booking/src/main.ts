import Vue from 'vue';
import scssVars from '@/styles/variables.scss';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';
import vuetify from './plugins/vuetify';
import Notifications from 'vue-notification';

Vue.config.productionTip = false;

// Make scssVars available for every vue component, so global-exported scss-vars are referenceable within template
Vue.prototype.$scssVars = scssVars;
Vue.prototype.$apiUrl = 'http://localhost:9000';

Vue.use(Notifications);

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: (h) => h(App)
}).$mount('#app');
