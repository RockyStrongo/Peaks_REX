<template>
    <button class="Button" :class="class">{{label}}</button>
</template>

<script>

export default {

    name: 'Button',


    props: {
        label: '',
        class: '',
    },

}
</script>



<style>
@import url('Button.css');
</style>