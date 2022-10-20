<template>
 <div class="LoginPage-grid-container">

<!-- left column -->
<div class="LoginPage-grid-item-left"></div>

<!-- right column -->
<div class="LoginPage-grid-item-right">

    <div class="LoginPage-flex-container">

        <Logo/>
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