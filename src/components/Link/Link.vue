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
.Link {
    text-decoration: underline;
    transition: color .2s;
}

link:hover,
link:focus-visible {
    color: var(--blue)
}


.Link--small {
    font-size: 12px;
}

.Link--noaccount {
    margin: 12px;
}

.Link--lostpassword{
    color: var(--white)
}
</style>