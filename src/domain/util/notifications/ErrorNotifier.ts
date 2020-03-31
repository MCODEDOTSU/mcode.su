import Vue from 'vue';

class ErrorNotifier {

    public static notify() {
        Vue.prototype.$notify({
            classes: 'vue-notification-error',
            title: 'Ошибка',
            text: 'При выполнении запроса произошла ошибка',
            duration: 10000,
        });
    }

    public static notifyWithCustomMessage(message: string) {
        Vue.prototype.$notify({
            classes: 'vue-notification-error',
            title: 'Ошибка',
            text: message,
            duration: 10000,
        });
    }
}

export default ErrorNotifier;
