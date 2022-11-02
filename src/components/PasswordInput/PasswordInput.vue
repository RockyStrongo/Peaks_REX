<template>

    <label class="input-label">
        <span class="pink-asterisk" v-if="isRequired">* </span>
        {{label}}
    </label>

    <div class="PasswordInput-eyeContainer">
        <input 
        class="input" 
        type="password" 
        autocomplete="current-password" 
        v-model="password" 
        name="password"
        :placeholder="label" 
        ref="inputPasswordElement" :required="isRequired" 
        @keyup="emit" />

            <img class="PasswordInput-eye" :src="passwordVisible ? src='../../src/assets/images/eye-password-closed.svg' : src='../../src/assets/images/eye-password-open.svg'" 
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
        emit(){
            this.passwordComplex = this.passwordIsComplex()
            this.emitter.emit("password-complex", this.passwordComplex);

            const dataobj = {"field": this.field, "value" : this.password};
            this.emitter.emit(this.field, dataobj);
        }

    },

}
</script>

<style lang="scss">
@use '../../styles/colors';

.PasswordInput-eye {
    position: absolute;
    top: 13px;
    right: 18px;
    display: block;
    height: 18px;
    cursor: pointer;
}

.PasswordInput-eyeContainer {
    position: relative
}
</style>