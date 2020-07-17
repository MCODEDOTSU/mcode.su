import axios from 'axios';
import { baseUrlAPI } from '@/globals';
import ErrorNotifier from '@/domain/util/notifications/ErrorNotifier';
import SuccessNotifier from '@/domain/util/notifications/SuccessNotifier';
export const state = {
    company: { id: 0 },
};
export const actions = {
    companyGet({}, payload) {
        axios.post(`${baseUrlAPI}request`, {
            action: 'company-profile',
            type: 'get',
            token: payload.token
        }).then((response) => {
            state.company = response['data']['content'];
            console.log(state.company);
        }).catch((error) => {
            ErrorNotifier.notifyWithCustomMessage('Не удалось получить данные компании: неизвестная ошибка');
        });
    },
    companySet({}, payload) {
        axios.post(`${baseUrlAPI}request`, {
            action: 'company-profile',
            type: 'post',
            token: payload.token,
            data: state.company
        }).then((response) => {
            console.log(response);
            // state.company = response['data']['content'];
            SuccessNotifier.notify('Запрос отправлен', 'Данные компании успешно сохранены');
        }).catch((error) => {
            if (error.response && error.response.status && error.response.status === 422) {
                let msg = `Не удалось сохранить данные компании: ${error.response.data.body.message}`;
                ErrorNotifier.notifyWithCustomMessage(msg);
            }
            else {
                ErrorNotifier.notifyWithCustomMessage('Не удалось сохранить данные компании');
            }
            console.log(error.response);
        });
    },
};
export const company = {
    state,
    actions,
};
//# sourceMappingURL=company.js.map