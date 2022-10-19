<template>

    <SnackBar v-if="snackBarVisible" :snackText="snackBarText" :snackType="snackBarType"></SnackBar>

    <form class="SignUpForm" ref="SignUpFormElement" @submit="validateSignUpForm">

        <LoginFormsTitle titleText="Inscription" />

        <div class="SignUpForm-flex-container">
            <div class="SignUpForm-flex-container-child">
                <TextInput label="Nom" placeholder="Nom" :isRequired="true" />
            </div>

            <div class=SignUpForm-flex-container-child>
                <TextInput label="Prénom" placeholder="Prénom" :isRequired="true" />
            </div>
        </div>

        <SelectInput :items=agencyOptions label="Agence de rattachement" :isRequired="true"></SelectInput>

        <EmailInput label="Email" :isRequired="true" />

        <PasswordInput label="Mot de passe" :isRequired="true" :confirmation="false" />

        <PasswordInput label="Mot de passe (confirmation)" :isRequired="true" :confirmation="true" />


        <div class="SignUpForm-align-right">

            <Link href="/login" class="Link--small Link--noaccount" title="Se connecter" target="_self" />

            <Button label="Inscription" class="Button--pink"></Button>

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
import TextInput from '../TextInput/TextInput.vue';
import SelectInput from '../SelectInput/SelectInput.vue';

export default {
    name: 'SignUpForm',

    components: {
        EmailInput,
        PasswordInput,
        Button,
        SnackBar,
        Link,
        LoginFormsTitle,
        TextInput,
        SelectInput
    },

    data() {
        return {
            password: '',
            passwordConfirmation: '',

            emailIsValid: false,
            emailIsPeaks: false,
            passwordIsComplex: false,
            passwordConfirmationOK: false,
            snackBarVisible: false,

            snackBarText: "",
            snackBarType: "",

            //où stocker ces messages pour qu'ils soient utilisables partout?
            ERROR_MESSAGE_INVALID_EMAIL: "L'adresse email doit être valide",
            ERROR_MESSAGE_EMAIL_PEAKS: "L'adresse email doit appartenir à Peaks",
            ERROR_MESSAGE_PASSWORD_COMPLEXITY: "Le mot de passe doit contenir au minimum 8 caractères, un chiffre et une majuscule",
            ERROR_MESSAGE_PASSWORD_CONFIRMATION: "Le mot de passe et la confirmation ne correspondent pas",

            //où stocker ces options pour qu'elles soient utilisables partout?
            agencyOptions: ["Aix", "Lyon", "Reims/Paris"]
        }

    },

    methods: {
        validateSignUpForm(event) {

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

            }
            else if (this.password !== this.passwordConfirmation) {
                this.snackBarVisible = true
                this.snackBarText = this.ERROR_MESSAGE_PASSWORD_CONFIRMATION
                this.snackBarType = "error"
            }
            else {
                this.$refs.SignUpFormElement.submit()
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
        getPasswordfromEmitter(string) {
            this.password = string
        },
        getPasswordConfirmationfromEmitter(string) {
            this.passwordConfirmation = string
        }
    },
    mounted() {
        this.emitter.on("email-valid", this.getEmailIsValidfromEmitter)
        this.emitter.on("email-peaks", this.getEmailIsPeaksfromEmitter)
        this.emitter.on("password-complex", this.getPasswordIsComplexfromEmitter)
        this.emitter.on("password", this.getPasswordfromEmitter)
        this.emitter.on("password-confirmation", this.getPasswordConfirmationfromEmitter)
    }
}

</script>

<style>
@import url('SignUpForm.css');
</style>