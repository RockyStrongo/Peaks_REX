<template>
    <label>{{label}}</label>
    <input class="input-text" name="login" placeholder="Email" type="email" autocomplete="username" v-model="email" required data-input-email />
</template>

<script>
import EmailInput from './EmailInput.js';

export default EmailInput;
</script>
