<template>
    <h2 class="Form" :class="class">{{title}}</h2>
</template>

<script>

export default {

    name: 'Link',


    props: {
        title: {
            type : String,
            required: true,
        },
        class:''
    },

}
</script>



<style lang="scss">
.Form {
    font-family: Catamaran;
    font-size: 35px;
}
</style>