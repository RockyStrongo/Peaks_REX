<template>



    <form class="login-forms" ref="ConnectionFormElement" @submit="validateConnnectionForm">
        <Transition>
            <SnackBar v-if="snackBarVisible" :snackText="snackBarText" :snackType="snackBarType"></SnackBar>
        </Transition>

        <LoginFormsTitle titleText="Connexion" />

        <EmailInput label="Email" :isRequired="true" field="email" />

        <PasswordInput label="Mot de passe" :isRequired="true" field="password" />

        <div class="loginForms-alignRight">

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
import cryptoPassphrase from '../../cryptoPassphrase';

import CryptoJS from "crypto-js";

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

            snackBarVisible: false,

            snackBarText: String,
            snackBarType: String,

            userConnected: Array,
            decryptedPassword: String,
        }

    },

    methods: {

        async validateConnnectionForm(event) {
            event.preventDefault();

            const credentialsOK = await this.ValidateCredentials();

            if (credentialsOK) {
                sessionStorage.setItem('userConnected', JSON.stringify(this.userConnected));
                this.$router.push('/list-of-experiences')
                // let b = JSON.parse(sessionStorage.getItem('userConnected'))
                // console.log(b[0].firstname)
            }


        },


        async getUserData() {

            let APIData = await this.$apollo.query({
                query: globalConstants.GQL_GET_USER_BY_EMAIL,
                variables: {
                    email: this.email,
                }
            })

            let userData = APIData.data.user

            userData.length !== 1
                ? this.emailExists = false
                : this.emailExists = true

            if (userData.length === 1) {

                this.userConnected = userData;

                const userpassword = userData[0].password
                
                this.decryptPassword(userpassword)

                this.decryptedPassword === this.password
                    ? this.PasswordIsCorrect = true
                    : this.PasswordIsCorrect = false
            }
        },


        async ValidateCredentials() {
            await this.getUserData()

            if (!this.emailExists) {
                this.snackBarVisible = true
                this.snackBarText = globalConstants.ERROR_MESSAGE_INVALID_CREDENTIALS
                this.snackBarType = "error"
            } else if (!this.PasswordIsCorrect) {
                this.snackBarVisible = true
                this.snackBarText = globalConstants.ERROR_MESSAGE_INVALID_CREDENTIALS
                this.snackBarType = "error"
            } else {
                return true;
            }
        },

        decryptPassword(password) {
            let decryptData = CryptoJS.AES.decrypt(
                password,
                cryptoPassphrase.passphrase
            ).toString(CryptoJS.enc.Utf8)

            this.decryptedPassword = decryptData
        },


        getFormDatafromEmitter(item) {
            const fieldname = item.field.toString()
            this[fieldname] = item.value
        }

    },
    mounted() {

        this.formFields.forEach(item =>

            this.emitter.on(item, this.getFormDatafromEmitter)

        )

    }
}

</script>

<style>

</style>