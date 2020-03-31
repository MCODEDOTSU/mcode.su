import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';
import About from './views/About.vue';
import Portfolio from './views/Portfolio.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
      {
          path: '/', name: 'home', component: Home, meta: { requiresAuth: false },
      },
      {
          path: '/about', name: 'about', component: About, meta: { requiresAuth: false },
      },
      {
          path: '/portfolio', name: 'portfolio', component: Portfolio, meta: { requiresAuth: false },
      },
  ],
});
