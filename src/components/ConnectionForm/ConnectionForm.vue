<template>

    <SnackBar v-if="snackBarVisible" :snackText="snackBarText" :snackType="snackBarType"></SnackBar>

    <form class="login-forms" ref="ConnectionFormElement" @submit="validateConnnectionForm">

        <LoginFormsTitle titleText="Connexion" />

        <EmailInput label="Email" :isRequired="true" field="email" />

        <PasswordInput label="Mot de passe" :isRequired="true" field="password" />

        <div class="login-forms-align-right">

            <Link href="/signup" class="Link--small Link--noaccount" title="Vous n'avez pas encore de compte ?"
                target="_self" />

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

import globalConstants from '../../const'


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
            formFields: ["email", "password"],
            email: String,
            password: String,

            emailExists: Boolean,
            PasswordIsCorrect: Boolean,

            emailIsValid: Boolean,
            emailIsPeaks: Boolean,
            passwordIsComplex: Boolean,
            snackBarVisible: false,

            snackBarText: String,
            snackBarType: String,
        }

    },

    methods: {
        validateConnnectionForm(event) {

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

            } else {
                this.checkCredentials().then(
                
                

                )
            }

        },


        async checkCredentials() {

            const emailinput = this.email

            const response = await fetch('../../src/mock-data/mock-user-data.json')
                .then(function (response) {
                    if (response.ok) {
                        return response.json()
                    } else {
                        console.log("error")
                    }
                })

            const filtered = response.filter(item => item['email'] === emailinput)

            filtered.length !== 1
                ? this.emailExists = false
                : this.emailExists = true

            if (filtered.length === 1) {
                const userpassword = filtered[0].password
                userpassword === this.password
                    ? this.PasswordIsCorrect = true
                    : this.PasswordIsCorrect = false
            }

            if (!this.emailExists) {
                this.snackBarVisible = true
                this.snackBarText = globalConstants.ERROR_MESSAGE_INVALID_CREDENTIALS
                this.snackBarType = "error"
            } else if (!this.PasswordIsCorrect) {
                this.snackBarVisible = true
                this.snackBarText = globalConstants.ERROR_MESSAGE_INVALID_CREDENTIALS
                this.snackBarType = "error"
            } else {
                this.snackBarVisible = true
                this.snackBarText = "Bravo ! vous êtes connecté "
                this.snackBarType = "success"
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

            this.emitter.on(item, this.getFormDatafromEmitter)

        )

    }
}

</script>

<style>
</style>