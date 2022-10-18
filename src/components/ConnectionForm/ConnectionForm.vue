<template>

    <SnackBar v-if="snackBarVisible" :snackText="snackBarText" :snackIconPath="snackBarIcon"></SnackBar>

    <form class="ConnectionForm" ref="ConnectionFormElement" @submit="validateConnnectionForm">

        <Title title="Connexion" class="ConnectionForm-title"> </Title>

        <span class="ConnectionForm-subtext ">Les champs marqués d'un <span class="pink-asterisk">*</span> sont
            obligatoires</span>

        <hr class="ConnectionForm-line">

        <EmailInput label="Email" :isRequired="true" />

        <PasswordInput label="Mot de passe" :isRequired="true" />

        <div class="align-right">

            <Link href="http://netflix.com" class="Link--small Link--noaccount"
                title="Vous n'avez pas encore de compte ?" target="_self" />

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
import Title from '../Title/Title.vue';



export default {
    name: 'ConnectionForm',

    components: {
        EmailInput,
        PasswordInput,
        Button,
        SnackBar,
        Link,
        Title
    },

    data() {
        return {
            emailIsValid: false,
            emailIsPeaks: false,
            passwordIsComplex: false,
            snackBarVisible: false,

            snackBarText: "",
            snackBarIcon: "",

            ERROR_MESSAGE_INVALID_EMAIL: "L'adresse email doit être valide",
            ERROR_MESSAGE_EMAIL_PEAKS: "L'adresse email doit appartenir à Peaks",
            ERROR_MESSAGE_PASSWORD_COMPLEXITY: "Le mot de passe doit contenir au minimum 8 caractères, un chiffre et une majuscule",

            SNACK_BAR_ICON_ERROR: "../../src/assets/images/attention.svg",
        }

    },

    methods: {
        validateConnnectionForm(event) {

            event.preventDefault();

            if (!this.emailIsValid) {
                this.snackBarVisible = true
                this.snackBarText = this.ERROR_MESSAGE_INVALID_EMAIL
                this.snackBarIcon = this.SNACK_BAR_ICON_ERROR
            }
            else if (!this.emailIsPeaks) {
                this.snackBarVisible = true
                this.snackBarText = this.ERROR_MESSAGE_EMAIL_PEAKS
                this.snackBarIcon = this.SNACK_BAR_ICON_ERROR

            }
            else if (!this.passwordIsComplex) {
                this.snackBarVisible = true
                this.snackBarText = this.ERROR_MESSAGE_PASSWORD_COMPLEXITY
                this.snackBarIcon = this.SNACK_BAR_ICON_ERROR

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
        }
    },
    mounted() {
        this.emitter.on("email-valid", this.getEmailIsValidfromEmitter)
        this.emitter.on("email-peaks", this.getEmailIsPeaksfromEmitter)
        this.emitter.on("password-complex", this.getPasswordIsComplexfromEmitter)
    }
}

</script>

<style>
.ConnectionForm {
    color: #fff;
}

.ConnectionForm-subtext {
    font-size: 12px;
    font-weight: 300;
}

.pink-asterisk {
    color: var(--pink);
}

.ConnectionForm-line {
    width: 215px;
    margin-top: 13px;
    margin-bottom: 24px;
}
</style>