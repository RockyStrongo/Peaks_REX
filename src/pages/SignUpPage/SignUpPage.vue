<template>

    <div class="login-pages-grid-container">

        <!-- left column -->
        <div class="login-pages-grid-item-left"></div>

        <!-- right column -->
        <div class="login-pages-grid-item-right">

            <div class="login-pages-flex-container">

                <Logo type="pinkA" />
                <SignUpForm />

            </div>

        </div>
    </div>

</template>

<script>

import Logo from '../../components/Logo/Logo.vue';
import SignUpForm from '../../components/SignUpForm/SignUpForm.vue';

export default {
    name: 'SignUpPage',

    components: {
        Logo,
        SignUpForm,
    },
}


</script>

<style lang="scss">
</style>