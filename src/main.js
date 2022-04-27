import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import store from './store';

import { formatDate } from './utils/helper';

Vue.config.productionTip = false;

Vue.filter('transformDate', formatDate);

new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
}).$mount('#app');
