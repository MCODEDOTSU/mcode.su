<template>
    <header>
        <nav class="menu">
            <ul>
                <li>
                    <router-link :to="{ name: 'home' }" title="Главная">Главная</router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'portfolio' }" title="Портфолио">Портфолио</router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'about' }" title="О нас">О нас</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script lang="ts">

    import {Component, Provide, Vue} from 'vue-property-decorator';
    import {State, Action} from 'vuex-class';
    import UserState from '@/store/modules/user/types';

    @Component({})
    export default class HomeHeader extends Vue {

        @State('user') public userState: UserState;

        @Action public logout: any;

    }
</script>
