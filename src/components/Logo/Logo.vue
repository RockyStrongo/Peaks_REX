<template>
    <img class="Logo" src="../../assets/images/logo.svg" alt="Logo peaks" title="Logo peaks" @click="goHome">
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
.Logo {
    width: 150px;
    cursor: pointer;
}

</style>