<template>
    <SnackBar v-if="snackBarVisible" :snackText="snackBarText" :snackIconPath="snackBarIcon"></SnackBar>
    <form class="connection-form" name="connection-form" action="" data-form-connection>
        <h2>Connexion</h2>
        <span class="subtext ">Les champs marqués d'une <span class="pink-text">*</span> sont
            obligatoires</span>
        <hr class="line">
        <EmailInput label="Email" />
        <PasswordInput label="Mot de passe" />
        <div class="align-right">
            <a href="" class="link link--small lostpassword">Vous n'avez pas encore de compte ?</a>
            <Button type="submit" class="Button Button--pink pink-button" label="Connexion"></Button>
          </div>
        
    </form>
</template>

<script>
import ConnectionForm from './ConnectionForm.js';

export default ConnectionForm;
</script>

<style>
@import url(ConnectionForm.css);
</style>