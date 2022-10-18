<template>
    <label class="EmailInput-label">{{label}} <span class="pink-asterisk" v-if="isRequired"> *</span> </label>
    <input class="EmailInput" name="login" placeholder="Email" type="email" autocomplete="username" v-model="email" />
</template>

<script>
const VALID_EMAIL_REGEX = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

export default {

    name: 'EmailInput',

    props: {
        label: '',
        isRequired: false
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
           this.emailValid = VALID_EMAIL_REGEX.test(this.email)
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
        }
    }
}
</script>

<style>
.EmailInput {
    height: 45px;
    width: 100%;
    padding: 18px;
    margin-bottom: 20px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    color: #19284A;
}

.EmailInput-label{
    font-family: Catamaran;
    font-weight: 700;
    font-size: 12px;
    margin-bottom: 5px;
}

.pink-asterisk {
    color: var(--pink);
}
</style>