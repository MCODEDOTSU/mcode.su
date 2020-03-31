import Router from '@/router';
import {ActionTree, Module, MutationTree} from 'vuex';
import axios from 'axios';
import {baseUrlAPI} from '@/globals';
import RootState from '@/store/types';
import ErrorNotifier from '@/domain/util/notifications/ErrorNotifier';
import UserState from '@/store/modules/user/types';

export const state: UserState = {
    user: {
        id: 0,
        name: '',
        email: '',
        password: '',
    },
    users: [],
    token: '',
    role: '',
};

export const mutations: MutationTree<UserState> = {

    /**
     * Получение пользователя - и после этого редирект на рабочий стол
     * @param state
     * @param payload
     */
    getUser(state, payload) {
        state.user = payload;
        if (Router.currentRoute.meta.requiresAuth === false) {
            if (state.user.role === 'M' || state.user.role === 'A') {
                Router.push({name: 'manager-complaints'});
            } else if (state.user.role === 'C') {
                Router.push({name: 'manager-client-complaints'});
            } else {
                Router.push({name: 'home'});
            }
        }
    },

};

export const actions: ActionTree<UserState, RootState> = {

    /**
     * Получение залогиненного пользователя с сервера
     * @param {any} commit
     * @param state
     * @param dispatch
     * @returns {any}
     */
    getUser({commit, state, dispatch}): any {
        axios.get(`${baseUrlAPI}user`).then((response) => {
            const payload = response.data;
            commit('getUser', payload);
        }, () => {
            state.token = '';
            // ErrorNotifier.notify();
        });
    },

    async getNewToken({}, payload) {
        try {
            const url = `${baseUrlAPI}refresh`;
            const result = await axios.post(url, state.user);
            state.token = 'Bearer ' + result.data.token;
        } catch {
            ErrorNotifier.notify();
        }
    },

    async logout({}, payload) {
        try {
            const url = `${baseUrlAPI}logout`;
            const result = await axios.get(url);
            state.token = '';
            Router.push({name: 'home'});
        } catch {
            ErrorNotifier.notify();
        }
    },


};

export const user: Module<UserState, RootState> = {
    state,
    mutations,
    actions,
};
