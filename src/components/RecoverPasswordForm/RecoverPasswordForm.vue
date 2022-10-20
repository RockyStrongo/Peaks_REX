<template>
  <SnackBar v-if="snackBarVisible" :snackText="snackBarText" :snackType="snackBarType"></SnackBar>

<form class="" ref="RecoverPasswordFormElement" @submit="validateRecoverPasswordForm">

    <LoginFormsTitle titleText="Récupération du mot de passe" />

    <EmailInput label="Email" :isRequired="true" />


    <div class="ConnectionForm-align-right">

        <Button label="Connexion" class="Button--pink"></Button>

    </div>

</form>
</template>

<script>
import SnackBar from '../SnackBar/SnackBar.vue';
import LoginFormsTitle from '../LoginFormsTitle/LoginFormsTitle.vue';
import EmailInput from '../EmailInput/EmailInput.vue';
import Button from '../Button/Button.vue';

export default {
    name: 'RecoverPasswordForm',

    props: {
      
    },

    components: {
    SnackBar,
    LoginFormsTitle,
    EmailInput,
    Button
},


    computed: {

    },

    watch: {

    },

    data() {
        return {
            emailIsValid: false,
            emailIsPeaks: false,

            snackBarVisible: false,

            snackBarText: "",
            snackBarType: "",

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
            else {
                this.$refs.ConnectionFormElement.submit()
            }

        },

        getEmailIsValidfromEmitter(bool) {
            this.emailIsValid = bool
        },
        getEmailIsPeaksfromEmitter(bool) {
            this.emailIsPeaks = bool
        },
    },
    mounted() {
        this.emitter.on("email-valid", this.getEmailIsValidfromEmitter)
        this.emitter.on("email-peaks", this.getEmailIsPeaksfromEmitter)
    }
}



</script>

<style>

</style>