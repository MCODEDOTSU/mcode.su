<template>
    <div class="welcome home">
        <div class="main">
            <m-header></m-header>
            <div class="left-main max-height">
                <a href="javascript:void(0)" title="Master Code" class="logo home" @click="scroll">
                    <img src="../assets/apple-touch-icon-152x152.png" alt="Master Code"/>
                    <h1>Master Code</h1>
                    <h2>Разработка и сопровождение приложений</h2>
                </a>
            </div>
            <div class="right-main max-height">
                <vue-scrollbar class="scrollbar scrollbar-min" ref="scrollbar">
                    <div class="welcome-content">
                        <p>Проектирование и разработка информационных систем, комплексных веб-решений, сайтов для
                            бизнеса и интернет-магазинов.</p>
                        <h2>Технологии</h2>
                        <p>> JavaScript, HTML5, CSS3, Vue.js, Single Page Applications (SPA), SCSS, ES6 Modules,
                            Webpack, jQuery, WebSockets, Rest API, Raw Sockets, Bootstrap.</p>
                        <p>> NGINX, Apache HTTP Server, Docker, Lunix (Ubuntu, Red Hat, SUSE), Windows Server.</p>
                        <p>> PostgreSQL, MySQL, Microsoft SQL Server.</p>
                        <p>> Jenkins, Webpack, npm, Git, Laravel, WordPress.</p>
                        <p>> PHP, Python, С#, ASP.NET, Entity Framework, WPF.</p>
                        <h2>Обратная связь</h2>
                        <p class="message">
                            <textarea v-model="message.message" v-on:keyup.enter="send"
                                      placeholder="Укажите Ваше имя, контактный email или телефон, оставьте комментарий и мы с Вами обязательно свяжемся">
                            </textarea>
                            <button class="btn btn-link" @click="send">Отправить</button>
                            <span class="loader" v-show="loadState !== 0" @click="reload">
                                <i v-show="loadState === 1" class="fa-li fa fa-spinner fa-spin"></i>
                                <label v-show="loadState === 2">Ваше сообщение успешно отправлено</label>
                                <label v-show="loadState === 3">Ошибка при отправке сообщения</label>
                            </span>
                        </p>
                        <p class="contacts">
                            <a href="mailto:info@mcode.su" title="Написать">info@mcode.su</a>
                            <a href="tel:89608554569" title="Позвонить">+7 (960) 855-45-69</a>
                        </p>
                    </div>
                </vue-scrollbar>
            </div>
            <m-footer></m-footer>
        </div>
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
                this.message.message = '';
                this.loadState = 2;
                setTimeout(this.reload, 3000);
            }).catch((error) => {
                this.message.message = '';
                this.loadState = 3;
                setTimeout(this.reload, 3000);
            });
        }

        public reload() {
            if (this.loadState > 1) {
                this.loadState = 0;
            }
        }

        public scroll() {
            if (window.innerWidth > 784) {
                return;
            }
            $('body, html').animate({
                scrollTop: $('.right-main').offset().top
            }, 300);
        }

    }

</script>
