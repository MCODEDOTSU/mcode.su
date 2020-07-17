<template>
    <footer class="front">
        <div class="copyright">
            Все права защищены © <span v-html="date.getFullYear()"></span><br>
            <a href="/" title="GroozGo">GroozGo</a>
        </div>
    </footer>
</template>

<script lang="ts">

    import {Component, Provide, Vue} from 'vue-property-decorator';

    @Component({})
    export default class FrontFooter extends Vue {
        @Provide()
        public date = new Date();
    }

</script>
