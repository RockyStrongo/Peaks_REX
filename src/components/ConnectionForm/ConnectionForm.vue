<template>

    <SnackBar v-if="snackBarVisible" :snackText="snackBarText" :snackType="snackBarType"></SnackBar>

    <form class="ConnectionForm" ref="ConnectionFormElement" @submit="validateConnnectionForm">

        <LoginFormsTitle titleText="Connexion" />

        <EmailInput label="Email" :isRequired="true" />

        <PasswordInput label="Mot de passe" :isRequired="true" />

        <div class="ConnectionForm-align-right">

            <Link  href="/signup" class="Link--small Link--noaccount"
                title="Vous n'avez pas encore de compte ?" target="_self"/>

            <Button label="Connexion" class="Button--pink"></Button>

        </div>

    </form>
</template>

<script>
import EmailInput from '../EmailInput/EmailInput.vue';
import PasswordInput from '../PasswordInput/PasswordInput.vue';
import Button from '../Button/Button.vue';
import SnackBar from '../SnackBar/SnackBar.vue';
import Link from '../Link/Link.vue';
import LoginFormsTitle from '../LoginFormsTitle/LoginFormsTitle.vue';



export default {
    name: 'ConnectionForm',

    components: {
    EmailInput,
    PasswordInput,
    Button,
    SnackBar,
    Link,
    LoginFormsTitle
},

    data() {
        return {
            emailIsValid: false,
            emailIsPeaks: false,
            passwordIsComplex: false,
            snackBarVisible: false,

            snackBarText: "",
            snackBarType: "",

            ERROR_MESSAGE_INVALID_EMAIL: "L'adresse email doit être valide",
            ERROR_MESSAGE_EMAIL_PEAKS: "L'adresse email doit appartenir à Peaks",
            ERROR_MESSAGE_PASSWORD_COMPLEXITY: "Le mot de passe doit contenir au minimum 8 caractères, un chiffre et une majuscule",
        }

    },

    methods: {
        validateConnnectionForm(event) {

            event.preventDefault();

            if (!this.emailIsValid) {
                this.snackBarVisible = true
                this.snackBarText = this.ERROR_MESSAGE_INVALID_EMAIL
                this.snackBarType = "error"
            }
            else if (!this.emailIsPeaks) {
                this.snackBarVisible = true
                this.snackBarText = this.ERROR_MESSAGE_EMAIL_PEAKS
                this.snackBarType = "error"

            }
            else if (!this.passwordIsComplex) {
                this.snackBarVisible = true
                this.snackBarText = this.ERROR_MESSAGE_PASSWORD_COMPLEXITY
                this.snackBarType = "error"

            } else {
                this.$refs.ConnectionFormElement.submit()
            }

        },

        getEmailIsValidfromEmitter(bool) {
            this.emailIsValid = bool
        },
        getEmailIsPeaksfromEmitter(bool) {
            this.emailIsPeaks = bool
        },
        getPasswordIsComplexfromEmitter(bool) {
            this.passwordIsComplex = bool
        },
    },
    mounted() {
        this.emitter.on("email-valid", this.getEmailIsValidfromEmitter)
        this.emitter.on("email-peaks", this.getEmailIsPeaksfromEmitter)
        this.emitter.on("password-complex", this.getPasswordIsComplexfromEmitter)
    }
}

</script>

<style>
@import url('ConnectionForm.css');
</style>