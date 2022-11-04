<template>
    <label class="EmailInput-label"><span class="pink-asterisk" v-if="isRequired">* </span> {{label}}</label>
    <input class="EmailInput" name="login" placeholder="Email" type="email" autocomplete="username" v-model="value"
        :required="isRequired" @keyup="emit"/>
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
        value : {
            type: String,
            default : "",
            required: false,
        },
    },

    data() {
        return {
            emailValid: false,
            emailPeaks: false,
        }
    },

    methods: {
        emailIsValid() {
            this.emailValid = globalConstants.VALID_EMAIL_REGEX.test(this.value)
        },

        emailIsPeaks() {
            this.emailPeaks = this.value.includes("peaks")
        },

        emit(){
            this.emailIsValid()
            this.emitter.emit("email-valid", this.emailValid);

            this.emailIsPeaks()
            this.emitter.emit("email-peaks", this.emailPeaks);

            const dataobj = {"field": this.field, "value" : this.value};
            this.emitter.emit(this.field, dataobj);
        }

    },

}
</script>

<style lang="scss">

@use '../../styles/colors';

.EmailInput {
    height: 45px;
    width: 100%;
    padding: 18px;
    margin-bottom: 20px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    color: colors.$blue;
}

.EmailInput-label{
    font-family: Catamaran;
    font-weight: 700;
    font-size: 12px;
    margin-bottom: 5px;
}

</style>