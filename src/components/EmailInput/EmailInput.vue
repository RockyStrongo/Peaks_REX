<template>
    <label>{{label}}</label>
    <input class="EmailInput" type="email" autocomplete="username" v-model="email" />
</template>

<script>
import EmailInput from './EmailInput.js';

export default EmailInput;
</script>



<style>
@import url(EmailInput.css);
</style>