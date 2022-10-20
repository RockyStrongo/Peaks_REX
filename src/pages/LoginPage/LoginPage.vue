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
                <Link class="Link--small Link--lostpassword" href="/recover-password" target="_self"  title="Vous avez perdu votre mot de passe ?"/>
            </div>

        </div>
    </div>

</template>

<script>

import ConnectionForm from '../../components/ConnectionForm/ConnectionForm.vue';
import Logo from '../../components/Logo/Logo.vue';
import Link from '../../components/Link/Link.vue';

export default {
    name: 'LoginPage',

    components: {
    ConnectionForm,
    Logo,
    Link,
},

}


</script>

<style>
@import url('LoginPage.css');
</style>