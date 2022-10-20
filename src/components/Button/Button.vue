<template>
    <button class="Button" :class="class">{{label}}</button>
</template>

<script>

export default {

    name: 'Button',


    props: {
        label: {
            type: String,
            required: true,
        }
        ,
        class: String,
    },

}
</script>


<style>
@import url('Button.css');
</style>