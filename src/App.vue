<template>
    <div id="app">
        <notifications></notifications>
        <router-view></router-view>
    </div>
</template>


<script lang="ts">

    import {Component, Vue} from 'vue-property-decorator';
    import {Action, State} from 'vuex-class';
    import UserState from '@/store/modules/user/types';
    import Router from '@/router';

    @Component({ })
    export default class App extends Vue {

        @State('user') public userState!: UserState;

        public created() {
            if (this.userState.token === '' && Router.currentRoute.meta.requiresAuth === true) {
                Router.push({name: 'home'});
            } else if (this.userState.token !== '' && Router.currentRoute.name === 'home') {
                Router.push({name: 'cabinet'});
            }
        }

    }
</script>

<style lang="scss">
    @import "./public/sass/app.scss";
</style>
