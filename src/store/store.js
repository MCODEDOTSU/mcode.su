import Vue from 'vue';
import Vuex from 'vuex';
import { user } from '@/store/modules/user/user';
import { company } from '@/store/modules/company/company';
import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        applicationName: 'GroozGo',
    },
    mutations: {},
    actions: {},
    modules: { user, company },
    plugins: [createPersistedState({
            paths: ['user.token'],
        })],
});
//# sourceMappingURL=store.js.map