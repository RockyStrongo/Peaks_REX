<template>


    <form class="login-forms" ref="SignUpFormElement" @submit="validateSignUpForm">
        <Transition>
            <SnackBar 
                v-if="snackBarVisible" 
                :snackText="snackBarText" 
                :snackType="snackBarType" 
                :snackLink="snackBarLink"
                :snackLinkText="snackBarLinkText">
            </SnackBar>
        </Transition>

        <LoginFormsTitle titleText="Inscription" />

        <div class="SignUpForm-flexContainer">
            <div class="SignUpForm-flexContainerChild">
                <TextInput label="Nom" placeholder="Nom" :isRequired="true" field="lastName" />
            </div>

            <div class=SignUpForm-flexContainerChild>
                <TextInput label="Prénom" placeholder="Prénom" :isRequired="true" field="firstName" />
            </div>
        </div>

        <SelectInput :items="agencyOptions" label="Agence de rattachement" :isRequired="true" field="agency">
        </SelectInput>

        <EmailInput label="Email" :isRequired="true" field="email" />

        <PasswordInput label="Mot de passe" :isRequired="true" field="password" />

        <PasswordInput label="Mot de passe (confirmation)" :isRequired="true" field="passwordConfirmation" />


        <div class="loginForms-alignRight">

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

import CryptoJS from "crypto-js";

import globalConstants from '../../const'
import cryptoPassphrase from '../../cryptoPassphrase'

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

            encryptedPassword: String,


            emailIsValid: false,
            emailIsPeaks: false,
            passwordIsComplex: false,
            passwordConfirmationOK: false,
            snackBarVisible: false,

            snackBarText: "",
            snackBarType: "",
            snackBarLink: "",
            snackBarLinkText: "",

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
                this.createUser()
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
        },
        createUser() {
            this.encryptPassword(this.password)

            this.$apollo.mutate({
                mutation: globalConstants.GQL_CREATE_USER,
                variables: {
                    email: this.email,
                    firstname: this.firstName,
                    lastname: this.lastName,
                    password: this.encryptedPassword,
                    agency_id: this.agencyID(this.agency)
                }
            }).then(() => {
                this.snackBarVisible = true
                this.snackBarText = globalConstants.SUCCESS_MESSAGE_USER_CREATED
                this.snackBarType = "success"
                this.snackBarLink = "/login"
                this.snackBarLinkText = " Se connecter"
            }).catch((error) => {
                this.snackBarVisible = true
                this.snackBarText = error
                this.snackBarType = "error"
            })
        },
        agencyID(agency) {
            switch (agency) {
                case 'Aix-en-Provence':
                    return globalConstants.AGENCY_IDS.Aix
                case 'Lyon':
                    return globalConstants.AGENCY_IDS.Lyon
                case 'Reims/Paris':
                    return globalConstants.AGENCY_IDS.ReimsParis
                default:
                    console.log("Error - agency ID not found");
            }
        },

        encryptPassword(password){
            const encryptedPassword = CryptoJS.AES.encrypt(password, cryptoPassphrase.passphrase).toString();
            this.encryptedPassword = encryptedPassword
        },

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

<style lang="scss">
@use '../../styles/colors';



.SignUpForm-flexContainer {
    display: flex;
}

.SignUpForm-flexContainerChild:nth-child(odd) {
    margin-right: 20px;
}
</style>