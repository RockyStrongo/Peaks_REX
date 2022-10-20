<template>

    <label class="input-label"><span class="pink-asterisk" v-if="isRequired">* </span>{{label}}</label>

    <div class="PasswordInput-eye-container">
        <input class="input" type="password" autocomplete="current-password" v-model="password" name="password"
            :placeholder="label" ref="inputPasswordElement" :required="isRequired" @change="test" />
        <img class="PasswordInput-eye" src="../../assets/images/eye-password-open.svg" v-if="!passwordVisible"
            @click="togglePasswordVisibility">
        <img class="PasswordInput-eye" src="../../assets/images/eye-password-closed.svg" v-if="passwordVisible"
            @click="togglePasswordVisibility">
    </div>


</template>

<script>
import globalConstants from '../../const'

export default {

    name: 'PasswordInput',

    props: {
        label: {
            type: String,
            required: true
        },
        isRequired: {
            type: Boolean,
            required: true
        },
        field: String,
    },

    watch: {
        password() {
            this.emitter.emit(this.field, this.password);

            this.passwordComplex = this.passwordIsComplex()
            this.emitter.emit("password-complex", this.passwordComplex);
        }
    },

    data() {
        return {
            password: '',
            passwordComplex: false,
            passwordVisible: false,
        }
    },

    methods: {
        passwordIsComplex() {
            return globalConstants.PASSWORD_COMPLEXITY_REGEX.test(this.password) || false
        },
        togglePasswordVisibility() {

            const fieldtype = this.$refs.inputPasswordElement.type.toLowerCase()
            fieldtype === 'password' ? this.showPassword() : this.hidePassword()
        },
        showPassword() {
            this.$refs.inputPasswordElement.type = "text"
            this.passwordVisible = true

        },
        hidePassword() {
            this.$refs.inputPasswordElement.type = "password"
            this.passwordVisible = false
        },

    },

}
</script>

<style>
@import url('PasswordInput.css');
</style>