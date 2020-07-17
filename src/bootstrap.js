import Vue from 'vue';

/* Bootstrap компоненты */
import BootstrapVue from 'bootstrap-vue';
Vue.use(BootstrapVue);
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import VueTheMask from 'vue-the-mask';
Vue.use(VueTheMask);

/* Loading Jquery */
try {
  window.$ = window.jQuery = require('jquery');
  require('bootstrap');
} catch (e) {}

import Notifications from 'vue-notification';
Vue.use(Notifications);
