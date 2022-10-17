<template>

    <div class="grid-container">

        <!-- left column -->
        <div class="grid-item-left"></div>

        <!-- right column -->
        <div class="grid-item-right">

            <div class="flex-container">

                <img class="logo" src="../../assets/images/logo.svg" alt="Logo peaks" title="Logo peaks">
                <!-- title section -->

                <ConnectionForm />

            </div>

            <!-- Recover password link -->
            <div class="bottom-right">
                <a href="/" class="link link--small">Vous avez perdu votre mot de passe ?</a>
            </div>

        </div>
    </div>

</template>

<script>

import LoginPage from './LoginPage.js';

export default LoginPage;

</script>

<style>
@import url(LoginPage.css);
</style>