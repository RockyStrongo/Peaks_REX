<template>
    <h2 class="Title" :class="class">{{title}}</h2>
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
.Title {
    font-family: Catamaran;
    font-size: 35px;
}
</style>