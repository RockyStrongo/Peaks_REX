<template>

    <div class="SignUpPage-grid-container">

        <!-- left column -->
        <div class="SignUpPage-grid-item-left"></div>

        <!-- right column -->
        <div class="SignUpPage-grid-item-right">

            <div class="SignUpPage-flex-container">

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

<style>
@import url('SignUpPage.css');
</style>