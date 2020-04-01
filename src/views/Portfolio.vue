<template>
    <div class="welcome">
        <m-header></m-header>
        <div class="content">
            <h1>Портфолио</h1>
            <ul class="portfolio" v-if="loadPortfolioState === 0">
                <li class="item" v-for="item in portfolioItems">
                    <div class="icon" :style="getStyle(item)">{{ getIconLetter(item) }}</div>
                    <h2><a :href="item.href" :title="item.title" target="_blank">{{ item.title }}</a></h2>
                    <p>{{ item.description }}</p>
                    <p><span v-for="tag in getTags(item)" class="tag">{{ tag }}</span></p>
                </li>
            </ul>
            <p class="load-message" v-else>идёт загрузка данных ...</p>
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
        public portfolioItems = [];

        @Provide()
        public loadPortfolioState = 1;

        @Provide()
        public loadState = 0;

        public created() {
            this.getPortfolio();
        }

        public async getPortfolio() {
            this.loadPortfolioState = 1;
            axios.get(`${baseUrlAPI}portfolio`).then((response) => {
                this.portfolioItems = response.data;
                this.loadPortfolioState = 0;
            });
        }

        public getStyle(item) {
            return `background: ${item.color_1};
                    background: -moz-linear-gradient(0deg, ${item.color_2} 0%, ${item.color_1} 100%);
                    background: -webkit-linear-gradient(0deg, ${item.color_2} 0%, ${item.color_1} 100%);
                    background: linear-gradient(0deg, ${item.color_2} 0%, ${item.color_1} 100%);`;
        }

        public getTags(item) {
            return item.briefcase.split(', ');
        }

        public getIconLetter(item) {
            return item.alias.substr(0, 2).toUpperCase();
        }

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
