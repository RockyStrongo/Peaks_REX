<template>
    <label class="EmailInput-label"><span class="pink-asterisk" v-if="isRequired">* </span> {{label}}</label>
    <input class="EmailInput" name="login" placeholder="Email" type="email" autocomplete="username" v-model="email"
        :required="isRequired" @blur="test"/>
</template>

<script>
import globalConstants from '../../const'

export default {

    name: 'EmailInput',

    props: {
        label: {
            type: String,
            required: true,
        },
        isRequired: {
            type: Boolean,
            required: true,
        },
        field : String,
    },

    data() {
        return {
            email: '',
            emailValid: false,
            emailPeaks: false,
        }
    },

    methods: {
        emailIsValid() {
            this.emailValid = globalConstants.VALID_EMAIL_REGEX.test(this.email)
        },

        emailIsPeaks() {
            this.emailPeaks = this.email.includes("peaks")
        },

    },
    watch: {
        email() {
            this.emailIsValid()
            this.emitter.emit("email-valid", this.emailValid);

            this.emailIsPeaks()
            this.emitter.emit("email-peaks", this.emailPeaks);

            const dataobj = {"field": this.field, "value" : this.email};
            this.emitter.emit(this.field, dataobj);
        }
    }
}
</script>

<style>
@import url('EmailInput.css');
</style>