import Vue from 'vue';
import moment from 'moment';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import store from './store';

Vue.config.productionTip = false;

Vue.filter('transformDate', (date) => moment(date).format('YYYY-MM-DD'));

new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
}).$mount('#app');
