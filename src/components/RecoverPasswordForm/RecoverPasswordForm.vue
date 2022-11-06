<template>

    <form class="login-forms" ref="RecoverPasswordFormElement" @submit="validateRecoverPasswordForm">

        <Transition>
            <SnackBar v-if="snackBarVisible" :snackText="snackBarText" :snackType="snackBarType"></SnackBar>
        </Transition>

        <LoginFormsTitle titleText="Récupération du mot de passe" />

        <EmailInput label="Email" :isRequired="true" field="email" />


        <div class="loginForms-alignRight">

            <Button label="Envoyer" class="Button--pink"></Button>

        </div>

    </form>
</template>

<script>
import SnackBar from '../SnackBar/SnackBar.vue';
import LoginFormsTitle from '../LoginFormsTitle/LoginFormsTitle.vue';
import EmailInput from '../EmailInput/EmailInput.vue';
import Button from '../Button/Button.vue';

import globalConstants from '../../const'

export default {
    name: 'RecoverPasswordForm',

    components: {
        SnackBar,
        LoginFormsTitle,
        EmailInput,
        Button
    },

    data() {
        return {
            formFields: ["email"],

            email: String,

            emailExists: Boolean,

            snackBarVisible: false,
            snackBarText: "",
            snackBarType: "",

        }

    },

    methods: {
        validateRecoverPasswordForm(event) {
            event.preventDefault()
            this.ValidateEmail()
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
        },

        async ValidateEmail() {
            await this.getUserData()

            if (!this.emailExists) {
                this.snackBarVisible = true
                this.snackBarText = globalConstants.ERROR_MESSAGE_EMAIL_DOES_NOT_EXIST
                this.snackBarType = "error"
            } else {
                //send recover email
                this.snackBarVisible = true
                this.snackBarText = globalConstants.INFO_MESSAGE_RECOVER_EMAIL + this.email
                this.snackBarType = "info"
            }

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

<style >
</style>