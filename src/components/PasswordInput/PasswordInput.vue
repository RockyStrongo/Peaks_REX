<template>

    <label class="PasswordInput-Label">{{label}}<span class="pink-asterisk" v-if="isRequired"> *</span></label>

    <div class="PasswordInput-eye-container">
        <input class="PasswordInput" type="password" autocomplete="current-password" v-model="password" name="password"
            placeholder="Mot de passe" ref="inputPasswordElement" />
        <img class="PasswordInput-eye" src="../../assets/images/eye-password-open.svg" v-if="!passwordVisible"
            @click="togglePasswordVisibility">
        <img class="PasswordInput-eye" src="../../assets/images/eye-password-closed.svg" v-if="passwordVisible"
            @click="togglePasswordVisibility">
    </div>


</template>

<script>
const PASSWORD_COMPLEXITY_REGEX = new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");

export default {

    name: 'PasswordInput',

    props: {
        label: '',
        isRequired: false
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
            return PASSWORD_COMPLEXITY_REGEX.test(this.password) || false
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
    watch: {
        password() {
            this.passwordComplex = this.passwordIsComplex()
            this.emitter.emit("password-complex", this.passwordComplex);
        }
    },
}
</script>

<style>
.PasswordInput {
    height: 45px;
    width: 100%;
    padding: 18px;
    margin-bottom: 20px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    color: #19284A;
}

.PasswordInput-Label {
    font-family: Catamaran;
    font-weight: 700;
    font-size: 12px;
    margin-bottom: 5px;
}

.PasswordInput-eye {
    position: absolute;
    top: 13px;
    right: 18px;
    display: block;
    height: 18px;
    cursor: pointer;
}

.PasswordInput-eye-container {
    position: relative
}

.pink-asterisk {
    color: var(--pink);
}

</style>