<template>

    <label>{{label}}</label>

    <input class="PasswordInput" type="password" autocomplete="current-password" v-model="password" data-input-password/>
    <img class="pw-eye" src="../../assets/images/eye-password-open.svg" data-eye="open" aria-hidden="false" >
    <img class="pw-eye" src="../../assets/images/eye-password-closed.svg" data-eye="close" aria-hidden="true" >

</template>

<script>

import PasswordInput from './PasswordInput.js';

export default PasswordInput;

</script>

<style>
@import url(PasswordInput.css);
</style>