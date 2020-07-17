<template>
    <nav class="manager-menu" v-bind:class="{ visibility: isVisibility }">
        <ul class="menu">
            <li class="current">
                <a href="/cabinet"><i class="fa fa-building-o"></i>Профиль компании</a>
            </li>
            <li>
                <a href="/cabinet"><i class="fa fa-list"></i> Заказы</a>
            </li>
            <li>
                <a href="/cabinet"><i class="fa fa-list"></i> Заказы</a>
            </li>
            <li>
                <a href="/cabinet"><i class="fa fa-list"></i> Заказы</a>
            </li>
        </ul>
        <button class="manager-menu-btn" @click="toggle">
            <i class="fa fa-times" v-if="isVisibility"></i>
            <i class="fa fa-bars" v-else></i>
        </button>
    </nav>
</template>

<script lang="ts">

    import {Component, Provide, Vue} from 'vue-property-decorator';
    import {State, Action} from 'vuex-class';

    @Component({})
    export default class MMenu extends Vue {

        @Provide()
        public isVisibility = false;

        public toggle() {
            this.isVisibility = !this.isVisibility;
        }

    }

</script>
