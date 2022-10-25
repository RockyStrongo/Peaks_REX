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



<style lang="scss">
@use '../../styles/colors';

.Link {
    text-decoration: underline;
    transition: color .2s;
}

.Link--small {
    font-size: 12px;
}

.Link--noaccount {
    margin: 12px;
}

.Link--lostpassword{
    color: colors.$white;
}
</style>