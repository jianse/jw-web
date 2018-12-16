import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import Element from 'element-ui';
import './plugins/element.js';
import axios from './axios';
import VueAxios from 'vue-axios';

import '@fortawesome/fontawesome-free/css/all.css';




Vue.use(VueAxios, axios);
Vue.config.productionTip = false;
Vue.use(Element);

new Vue({
  router,
  store,
  render: (h) => h(App),

}).$mount('#app');
