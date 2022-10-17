import EmailInput from '../EmailInput/EmailInput.vue';
import PasswordInput from '../PasswordInput/PasswordInput.vue';
import Button from '../Button/Button.vue';
import SnackBar from '../SnackBar/SnackBar.vue';



export default {
    name: 'ConnectionForm',

    components: {
        EmailInput,
        PasswordInput,
        Button,
        SnackBar
    },

    computed: {

        connectionFormSelector() {
            const CONNEXION_FORM_SELECTOR = '[data-form-connection]'
            const connectionFormElement = document.querySelector(CONNEXION_FORM_SELECTOR)
            return connectionFormElement;
        }

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
                this.connectionFormSelector.submit()
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
        this.connectionFormSelector.addEventListener('submit', this.validateConnnectionForm)

        this.emitter.on("email-valid", this.getEmailIsValidfromEmitter)
        this.emitter.on("email-peaks", this.getEmailIsPeaksfromEmitter)
        this.emitter.on("password-complex", this.getPasswordIsComplexfromEmitter)
    }
}
