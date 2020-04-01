<template>
    <div class="welcome">
        <m-header></m-header>
        <div class="content">
            <h1>О нас</h1>
            <div class="container">
                <p>Наша команда занимается разработкой Веб-приложений, а так же прикладных Windows-приложений с 2012
                    года. Вам стоит воспользоваться нашими услугами, если:</p>
                <ul>
                    <li>Вы хотите автоматизировать бизнес-процессы компании, сделать их прозрачными и
                        формализованными, повысить удобство и качество работы сотрудников;
                    </li>
                    <li>Вам не подходят существующие на рынке решения;</li>
                    <li>Вам необходима поддержка существующего решения, либо вы хотите перенести существующее
                        решение на новый, либо сопровождаемый технологический стек;
                    </li>
                    <li>Вы хотите найти команду, способную взять на себя разработку, внедрение, и сопровождение
                        проекта.
                    </li>
                </ul>
                <p>Что мы можем сделать для вас:</p>
                <ol>
                    <li>
                        <span>
                            <b>Выявление требований</b>, пожеланий, подготовка конкретизированного <b>технического задания</b> для будущего решения.
                            На данном этапе обсудим с вами автоматизируемые бизнес-процессы, документируем workflow, пожелания к <b>интерфейсу будущей системы</b>, подготовим техническое задание на автоматизацию (в соответствии с ГОСТ 19, ГОСТ 34);
                        </span>
                    </li>
                    <li>
                        <span>
                            <b>Разработка дизайна и прототипов.</b> Вы можете обсудить <b>визуальную составляющую интерфейса</b> с нашими дизайнерами, а также мы разработаем прототип решения - упрощенную версию, которая позволит увидеть как <b>будет выглядеть ваш проект</b>;
                        </span>
                    </li>
                    <li>
                        <span>
                            <b>Разработка серверной и клиентской части.</b> Если у вас уже есть команда разработчиков, но необходимы <b>специалисты</b> по серверной или клиентской частям - мы можем взять на себя эту работу, либо выполнить весь объем работ самостоятельно;
                        </span>
                    </li>
                    <li>
                        <span>
                            <b>Внедрение, поддержка.</b> Разработаем <b>инструкции</b>, видео ролики, осуществим обучение администраторов и пользователей системы, <b>поддержку</b>. Если у вас в штате нет системного администратора - можем взять на себя <b>администрирование сервера с проектом</b>.
                        </span>
                    </li>
                </ol>
                <h2>Контакты</h2>
                <table>
                    <tr>
                        <td width="150">Email</td>
                        <td><a href="mailto:info@mcode.su" title="Написать">info@mcode.su</a></td>
                    </tr>
                    <tr>
                        <td>Телефон</td>
                        <td><a href="tel:89608554569" title="Позвонить">+7(960)855-45-69</a></td>
                    </tr>
                    <tr>
                        <td>Реквизиты</td>
                        <td>ИП Сироткина Елена Игоревна, ИНН: 301711648261, ОГРНИП: 318302500015826</td>
                    </tr>
                </table>
                <h2>Обратная связь</h2>
                <p class="message">
                    <input v-model="message.phone" placeholder="Телефон"/>
                    <input v-model="message.email" placeholder="Email" class="last-child"/>
                    <textarea v-model="message.message" v-on:keyup.enter="send"
                              placeholder="Укажите Ваше имя, контактный email или телефон, оставьте комментарий и мы с Вами обязательно свяжемся">
                        </textarea>
                    <span class="actions">
                            <button class="btn btn-link" @click="send">Отправить</button>
                        </span>
                    <span class="loader" v-show="loadState !== 0" @click="reload">
                            <i v-show="loadState === 1" class="fa-li fa fa-spinner fa-spin"></i>
                            <label v-show="loadState === 2">Ваше сообщение успешно отправлено</label>
                            <label v-show="loadState === 3">Ошибка при отправке сообщения</label>
                        </span>
                </p>
            </div>
        </div>
        <m-footer></m-footer>
    </div>
</template>

<script lang="ts">

    import {Component, Provide, Vue} from 'vue-property-decorator';
    import {Action, State} from 'vuex-class';
    import axios from 'axios';
    import {baseUrlAPI} from '@/globals';
    import MHeader from '@/components/common/MHeader.vue';
    import MFooter from '@/components/common/MFooter.vue';

    @Component({components: {MHeader, MFooter}})
    export default class Home extends Vue {

        @Provide()
        public message = {
            phone: '',
            email: '',
            message: '',
        };

        @Provide()
        public loadState = 0;

        public async send() {
            this.loadState = 1;
            axios.post(`${baseUrlAPI}message`, this.message).then((response) => {
                this.message = {
                    phone: '',
                    email: '',
                    message: '',
                };
                this.loadState = 2;
                setTimeout(this.reload, 3000);
            }).catch((error) => {
                this.message = {
                    phone: '',
                    email: '',
                    message: '',
                };
                this.loadState = 3;
                setTimeout(this.reload, 3000);
            });
        }

        public reload() {
            if (this.loadState > 1) {
                this.loadState = 0;
            }
        }

    }

</script>
