<template>
 <div class="loginPages-gridContainer">

<!-- left column -->
<div class="loginPages-gridItemLeft"></div>

<!-- right column -->
<div class="loginPages-gridItemRight">

    <div class="loginPages-flexContainer">

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