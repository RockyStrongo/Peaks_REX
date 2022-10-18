<template>
    <h2 class="Form" :class="class">{{title}}</h2>
</template>

<script>

export default {

    name: 'Link',


    props: {
        title: '',
        class:''
    },

}
</script>



<style>
.Form {
    font-family: Catamaran;
    font-size: 35px;
}
.ConnectionForm-title {
    font-weight: 700;
    font-size: 20px;
}
</style>