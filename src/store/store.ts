import Vue from 'vue';
import Vuex from 'vuex';
import RootState from '@/store/types';
import {user} from '@/store/modules/user/user';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store<RootState>({

    state: {
        applicationName: 'MCODE',
    },

    mutations: {

    },

    actions: {

    },

    modules: {
        user,
    },

    plugins: [createPersistedState({
        paths: ['user.token'],
    })],

});
