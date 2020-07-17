<template>

    <div class="welcome home">

        <div class="main">

            <front-header></front-header>

            <div class="content">

                <div class="form">

                    <h1>Вход</h1>

                    <div class="control control-phone">
                        <the-mask v-model="company.phone" mask="+7 (###) ###-##-##" type="tel" placeholder="+7 (___) ___-__-__"></the-mask>
                    </div>

                    <div class="control control-password">
                        <input type="password" class="password" v-model="company.password"/>
                    </div>

                    <button class="input" @click="login">Войти</button>

                </div>

            </div>

            <front-footer></front-footer>

        </div>

    </div>

</template>

<script lang="ts">

    import {Component, Provide, Vue} from 'vue-property-decorator';
    import {Action, State} from 'vuex-class';
    import UserState from '@/store/modules/user/types';
    import FrontHeader from '@/components/common/FrontHeader.vue';
    import FrontFooter from '@/components/common/FrontFooter.vue';

    @Component({components: {FrontHeader, FrontFooter}})
    export default class Home extends Vue {

        @Action public userLogin: any;

        @State('user') public userState!: UserState;

        @Provide()
        public user = {
            phone: '9111111114',
            password: 'groozgo123',
        };

        public async login() {
            await this.userLogin(this.user);
        }
    }

</script>
