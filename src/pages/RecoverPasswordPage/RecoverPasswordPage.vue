<template>
 <div class="login-pages-grid-container">

<!-- left column -->
<div class="login-pages-grid-item-left"></div>

<!-- right column -->
<div class="login-pages-grid-item-right">

    <div class="login-pages-flex-container">

        <Logo type="pinkA" />
        <RecoverPasswordForm/>

    </div>

</div>
</div>
</template>

<script>
import Logo from '../../components/Logo/Logo.vue';
import RecoverPasswordForm from '../../components/RecoverPasswordForm/RecoverPasswordForm.vue';




export default {
    name: 'RecoverPasswordPage',

    components: {
    Logo,
    RecoverPasswordForm
},

}


</script>

<style>

</style>