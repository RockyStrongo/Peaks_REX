<template>
<Title :title="titleText" class="LoginFormsTitle-title"> </Title>

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

<style lang="scss">
@use '../../styles/colors';

.LoginFormsTitle-title{
    font-weight: 700;
    font-size: 20px;
}

.LoginFormsTitle-subtext {
    font-size: 12px;
    font-weight: 300;
}

.pink-asterisk {
    color: colors.$pink;
}

.LoginFormsTitle-line {
    width: 215px;
    margin-top: 13px;
    margin-bottom: 24px;
}

</style>