<template>
    <SnackBar v-if="snackBarVisible" :snackText="snackBarText" :snackIconPath="snackBarIcon"></SnackBar>
    <form data-form-connection>
        <EmailInput label="Email"/>
        <PasswordInput label="Mot de passe"/>
        <Button class="Button Button--pink pink-button" label="Connexion"></Button>
    </form>
</template>

<script>
import ConnectionForm from './ConnectionForm.js';

export default ConnectionForm;
</script>

<style>
@import url(ConnectionForm.css);
</style>