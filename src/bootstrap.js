import Vue from 'vue';

/* Компонент для интернационализации */
// import VueI18n from 'vue-i18n';
// Vue.use(VueI18n);

/* Bootstrap компоненты */
import BootstrapVue from 'bootstrap-vue';
Vue.use(BootstrapVue);
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

/* Красивый скролл */
import VueScrollbar from 'vue2-scrollbar';
Vue.component('vue-scrollbar', VueScrollbar);
import 'vue2-scrollbar/dist/style/vue2-scrollbar.css';

/* Loading Jquery */
try {
  window.$ = window.jQuery = require('jquery');
  require('bootstrap');
} catch (e) {}

import Notifications from 'vue-notification';
Vue.use(Notifications);
