<template>

    <div class="login-pages-grid-container">

        <!-- left column -->
        <div class="login-pages-grid-item-left"></div>

        <!-- right column -->
        <div class="login-pages-grid-item-right">

            <div class="login-pages-flex-container">
                <div class="LoginPage-logo-container">
                    <Logo type="pinkA" />
                </div>
                <ConnectionForm />

            </div>

            <!-- Recover password link -->
            <div class="LoginPage-bottom-right">
                <Link class="Link--small Link--lostpassword" href="/recover-password" target="_self"
                    title="Vous avez perdu votre mot de passe ?" />
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

<style lang="scss">
.LoginPage-bottom-right {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    grid-column: 1/2;
    grid-row: 2/3;
    margin-right: 15px;
    margin-bottom: 17px;
}
</style>