<template>
    <img class="logo" src="../../assets/images/logo.svg" alt="Logo peaks" title="Logo peaks" @click="goHome">
</template>

<script>

export default {

    name: 'Logo',

    methods: {
        goHome(){
            this.$router.push('/')
        }
    } 

}
</script>



<style>
.logo {
    width: 150px;
    margin-bottom: 10vh;
    cursor: pointer;
}
</style>