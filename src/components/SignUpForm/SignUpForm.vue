<template>
    <Transition>
        <SnackBar v-if="snackBarVisible" :snackText="snackBarText" :snackType="snackBarType"></SnackBar>
    </Transition>

    <form class="login-forms" ref="SignUpFormElement" @submit="validateSignUpForm">

        <LoginFormsTitle titleText="Inscription" />

        <div class="SignUpForm-flex-container">
            <div class="SignUpForm-flex-container-child">
                <TextInput label="Nom" placeholder="Nom" :isRequired="true" field="lastName" />
            </div>

            <div class=SignUpForm-flex-container-child>
                <TextInput label="Prénom" placeholder="Prénom" :isRequired="true" field="firstName" />
            </div>
        </div>

        <SelectInput :items="agencyOptions" label="Agence de rattachement" :isRequired="true" field="agency">
        </SelectInput>

        <EmailInput label="Email" :isRequired="true" field="email" />

        <PasswordInput label="Mot de passe" :isRequired="true" field="password" />

        <PasswordInput label="Mot de passe (confirmation)" :isRequired="true" field="passwordConfirmation" />


        <div class="login-forms-align-right">

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

import globalConstants from '../../const'

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
            formFields: ["firstName", "lastName", "agency", "email", "password", "passwordConfirmation"],

            firstName: String,
            lastName: String,
            agency: String,
            email: String,
            password: String,
            passwordConfirmation: String,


            emailIsValid: false,
            emailIsPeaks: false,
            passwordIsComplex: false,
            passwordConfirmationOK: false,
            snackBarVisible: false,

            snackBarText: "",
            snackBarType: "",
            agencyOptions: globalConstants.AGENCY_OPTIONS,
        }

    },

    methods: {
        validateSignUpForm(event) {

            event.preventDefault();

            if (!this.emailIsValid) {
                this.snackBarVisible = true
                this.snackBarText = globalConstants.ERROR_MESSAGE_INVALID_EMAIL
                this.snackBarType = "error"
            }
            else if (!this.emailIsPeaks) {
                this.snackBarVisible = true
                this.snackBarText = globalConstants.ERROR_MESSAGE_EMAIL_PEAKS
                this.snackBarType = "error"

            }
            else if (!this.passwordIsComplex) {
                this.snackBarVisible = true
                this.snackBarText = globalConstants.ERROR_MESSAGE_PASSWORD_COMPLEXITY
                this.snackBarType = "error"

            }
            else if (this.password !== this.passwordConfirmation) {
                this.snackBarVisible = true
                this.snackBarText = globalConstants.ERROR_MESSAGE_PASSWORD_CONFIRMATION
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

        getFormDatafromEmitter(item) {
            const fieldname = item.field.toString()
            this[fieldname] = item.value
        }


    },
    mounted() {
        this.emitter.on("email-valid", this.getEmailIsValidfromEmitter)
        this.emitter.on("email-peaks", this.getEmailIsPeaksfromEmitter)
        this.emitter.on("password-complex", this.getPasswordIsComplexfromEmitter)

        this.formFields.forEach(item =>

            this.emitter.on(item, this.getFormDatafromEmitter))

    }
}

</script>

<style>
@import url('SignUpForm.css');
</style>