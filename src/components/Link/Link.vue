<template>
    <a class="Link" :class="class" :href="href" :target="target">{{title}}</a>
</template>

<script>

export default {

    name: 'Link',

    props: {
        title: {
            type: String,
            required: true,
        },
        href: String,
        target: String,
        class: String
    },

}
</script>



<style>
@import url('Link.css');
</style>