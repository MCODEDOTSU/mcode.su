<template>
    <footer>
        <div class="copyright">
            Все права защищены © <span v-html="date.getFullYear()"></span>
            <a href="/" title="MCODE">MASTER CODE</a>
        </div>
    </footer>
</template>

<script lang="ts">

    import { Component, Provide, Vue } from 'vue-property-decorator';

    @Component({})
    export default class MFooter extends Vue {
        @Provide()
        public date = new Date();
    }

</script>
