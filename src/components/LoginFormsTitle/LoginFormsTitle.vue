<template>
<Title title="Connexion" class="LoginFormsTitle-title"> </Title>

<span class="LoginFormsTitle-subtext ">Les champs marqués d'un <span class="pink-asterisk">*</span> sont
    obligatoires</span>

<hr class="LoginFormsTitle-line">
</template>

<script>

import Title from '../Title/Title.vue';


export default {
    name: 'LoginFormsTitle',

    props: {
      titleText : {
        type: String,
        required: true 
      },
    },

    components: {
        Title
    },

    computed: {

    },

    data() {
        return {

        }

    },

    methods: {


    },
    mounted() {

    }
}


</script>

<style>
@import url('LoginFormsTitle.css');
</style>