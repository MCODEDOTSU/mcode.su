import Vue from 'vue';
import Vuex from 'vuex';
import { user } from '@/store/modules/user/user';
import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        applicationName: 'MCODE',
    },
    mutations: {},
    actions: {},
    modules: {
        user,
    },
    plugins: [createPersistedState({
            paths: ['user.token'],
        })],
});
//# sourceMappingURL=store.js.map