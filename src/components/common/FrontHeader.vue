<template>
    <header class="front">
        <a class="logo" href="/">
            <img src="/img/logo_theme_light.png" />
        </a>
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
