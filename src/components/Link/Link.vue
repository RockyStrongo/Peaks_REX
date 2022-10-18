<template>
    <a class="Link" :class="class" :href="href" :target="target" >{{title}}</a>
</template>

<script>

export default {

    name: 'Link',


    props: {
        title: '',
        href: '',
        target: '',
        class:''
    },

}
</script>



<style>
@import url('Link.css')
</style>