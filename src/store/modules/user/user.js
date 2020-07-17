import Router from '@/router';
import axios from 'axios';
import { baseUrlAPI } from '@/globals';
import ErrorNotifier from '@/domain/util/notifications/ErrorNotifier';
export const state = {
    user: {
        id: 0,
        email: '',
        firstname: '',
        lastname: '',
        middlename: '',
        phone: '',
    },
    role: {
        id: 0,
        name: '',
    },
    token: '',
};
export const actions = {
    userLogin({ commit, state, dispatch }, payload) {
        state.token = '';
        state.user = {
            id: 0,
            email: '',
            firstname: '',
            lastname: '',
            middlename: '',
            phone: '',
        };
        state.role = {
            id: 0,
            name: '',
        };
        axios.post(`${baseUrlAPI}request`, {
            action: 'login',
            type: 'post',
            data: { phone: payload.phone, password: payload.password }
        }).then((response) => {
            const data = response['data']['content'];
            state.token = data['token'];
            state.user = {
                id: data['active_sys_company_user']['id'],
                email: data['active_sys_company_user']['user']['email'],
                firstname: data['active_sys_company_user']['user']['firstname'],
                lastname: data['active_sys_company_user']['user']['lastname'],
                middlename: data['active_sys_company_user']['user']['middlename'],
                phone: data['active_sys_company_user']['user']['phone'],
            };
            state.role = {
                id: data['active_sys_company_user']['role']['id'],
                name: data['active_sys_company_user']['role']['name'],
            };
            Router.push({ name: 'cabinet' });
        }).catch((error) => {
            if (error.response && error.response.status && error.response.status === 422) {
                ErrorNotifier.notifyWithCustomMessage('Аутентификация не удалась: неверное имя пользователя или пароль');
            }
            else {
                ErrorNotifier.notifyWithCustomMessage('Аутентификация не удалась: неизвестная ошибка');
            }
        });
    },
};
export const user = {
    state,
    actions,
};
//# sourceMappingURL=user.js.map