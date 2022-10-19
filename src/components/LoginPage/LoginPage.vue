<template>

    <div class="LoginPage-grid-container">

        <!-- left column -->
        <div class="LoginPage-grid-item-left"></div>

        <!-- right column -->
        <div class="LoginPage-grid-item-right">

            <div class="LoginPage-flex-container">

                <Logo />
                <ConnectionForm />

            </div>

            <!-- Recover password link -->
            <div class="LoginPage-bottom-right">
                <Link class="Link--small Link--lostpassword" href="https://google.com" target="_self"  title="Vous avez perdu votre mot de passe ?"/>
            </div>

        </div>
    </div>

</template>

<script>

import ConnectionForm from '../ConnectionForm/ConnectionForm.vue';
import Logo from '../Logo/Logo.vue';
import Link from '../Link/Link.vue';

export default {
    name: 'LoginPage',

    components: {
    ConnectionForm,
    Logo,
    Link,
},

    computed: {

    },

    data() {
        return {

        }

    },

    methods: {

    },
    mounted() {

    }
}


</script>

<style>
@import url('LoginPage.css');
</style>