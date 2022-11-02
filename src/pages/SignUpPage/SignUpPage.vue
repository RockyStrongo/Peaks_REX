<template>

    <div class="loginPages-gridContainer">

        <!-- left column -->
        <div class="loginPages-gridItemLeft"></div>

        <!-- right column -->
        <div class="loginPages-gridItemRight">

            <div class="loginPages-flexContainer">

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