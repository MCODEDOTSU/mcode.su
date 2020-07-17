<template>

    <div class="manager">

        <div class="main">

            <m-header></m-header>

            <div class="content">

                <m-menu></m-menu>

                <div class="form">

                    <h1>Кабинет</h1>

                    <div class="form-content">

                        <div class="form-group">
                            <label for="organization_field">Наименование организации</label>
                            <input type="text" id="organization_field" readonly
                                   class="form-control" v-model="companyState.company.organization">
                        </div>

                        <div class="form-group">
                            <label for="inn_field">ИНН органиазции</label>
                            <input type="text" id="inn_field" readonly
                                   class="form-control" v-model="companyState.company.inn">
                        </div>

                        <div class="form-group">
                            <label for="kpp_field">КПП организации</label>
                            <input type="text" id="kpp_field" readonly
                                   class="form-control" v-model="companyState.company.kpp">
                        </div>

                        <div class="form-group">
                            <label for="director_field">ФИО руководителя компании</label>
                            <input type="text" id="director_field" readonly
                                   class="form-control" v-model="companyState.company.director">
                        </div>

                        <div class="form-group">
                            <label for="count_trucks_field">Общее количество машин в собственности *</label>
                            <input type="text" id="count_trucks_field" required
                                   class="form-control" v-model="companyState.company.count_trucks">
                        </div>

                        <div class="form-group" v-if="companyState.company.block_reason">
                            <label for="block_reason_field">Причина блокировки</label>
                            <input type="text" id="block_reason_field" readonly
                                   class="form-control" v-model="companyState.company.block_reason">
                        </div>

                        <div class="form-group">
                            <label for="post_address_field">Почтовый адрес *</label>
                            <input type="text" id="post_address_field" required
                                   class="form-control" v-model="companyState.company.post_address">
                        </div>

                        <div class="form-group">
                            <label for="site_field">Сайт компании</label>
                            <input type="text" id="site_field"
                                   class="form-control" v-model="companyState.company.site">
                        </div>

                        <div class="form-group">
                            <label for="bik_field">БИК</label>
                            <input type="text" id="bik_field"
                                   class="form-control" v-model="companyState.company.bik">
                        </div>

                        <div class="form-group">
                            <label for="bank_title_field">Наименование Банка</label>
                            <input type="text" id="bank_title_field" readonly
                                   class="form-control" v-model="companyState.company.bank_title">
                        </div>

                        <div class="form-group">
                            <label for="corr_account_field">Корреспондентский счет</label>
                            <input type="text" id="corr_account_field" readonly
                                   class="form-control" v-model="companyState.company.corr_account">
                        </div>

                        <div class="form-group">
                            <label for="bank_account_field">Номер банковского счета</label>
                            <input type="text" id="bank_account_field"
                                   class="form-control" v-model="companyState.company.bank_account">
                        </div>

                        <div class="form-group">
                            <label for="edo_contracts_field">Скан соглашения ЭДО</label>
                            <input type="text" id="edo_contracts_field"
                                   class="form-control" v-model="companyState.company.edo_contracts">
                        </div>

                        <div class="form-group">
                            <label for="edo_date_field">Срок действия соглашения об электронном взаимодействии</label>
                            <input type="text" id="edo_date_field"
                                   class="form-control" v-model="companyState.company.edo_date">
                        </div>

                        <div class="form-group">
                            <label for="edo_scan_checked_field">Скан соглашения об электронном взаимодействии проверен</label>
                            <input type="text" id="edo_scan_checked_field"
                                   class="form-control" v-model="companyState.company.edo_scan_checked">
                        </div>

                        <div class="form-group">
                            <label for="edo_original_field">Оригинал соглашения об электронном взаимодействии получен</label>
                            <input type="text" id="edo_original_field"
                                   class="form-control" v-model="companyState.company.edo_original">
                        </div>

                        <div class="form-group">
                            <button class="input" @click="save">Сохранить</button>
                        </div>

                    </div>

                </div>

            </div>

            <m-footer></m-footer>

        </div>

    </div>

</template>

<script lang="ts">

    import {Component, Provide, Vue, Watch} from 'vue-property-decorator';
    import {Action, State} from 'vuex-class';
    import UserState from '@/store/modules/user/types';
    import CompanyState from '@/store/modules/company/types';
    import MHeader from '@/components/common/MHeader.vue';
    import MFooter from '@/components/common/MFooter.vue';
    import MMenu from '@/components/common/MMenu.vue';

    @Component({components: {MHeader, MFooter, MMenu}})
    export default class Cabinet extends Vue {

        @Action public companyGet: any;
        @Action public companySet: any;

        @State('user') public userState!: UserState;
        @State('company') public companyState!: CompanyState;

        @Watch('companyState.company.bik')
        public onChangeCompanyBik() {
            this.companyState.company.bank_title = '';
            this.companyState.company.corr_account = '';
            if (this.companyState.company.bik !== '') {

                var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/bank";

                const options = {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": "Token 5d7f541af5b3cc8e369890f92a07574ecc68861a"
                    },
                    body: JSON.stringify({query: this.companyState.company.bik})
                };

                fetch(url, options).then(response => response.text())
                    .then(result => {
                        const suggestions = JSON.parse(result);
                        if (suggestions && suggestions.suggestions && suggestions.suggestions[0]) {
                            const bank = suggestions.suggestions[0];
                            this.companyState.company.bank_title = bank.value;
                            this.companyState.company.corr_account = bank.data.correspondent_account;
                        }
                    })
                    .catch(error => {
                        console.log("error", error);
                    });

            }
        }

        public async created() {
            await this.companyGet({token: this.userState.token});
        }

        public save() {
            this.companySet({token: this.userState.token});
        }
    }

</script>
