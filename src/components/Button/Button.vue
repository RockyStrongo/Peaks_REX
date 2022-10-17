<template>
    <button>{{label}}</button>
</template>

<script>

export default {

    name: 'Button',


    props: {
        label: ''
    },

}
</script>



<style>
@import url(Button.scss);
</style>