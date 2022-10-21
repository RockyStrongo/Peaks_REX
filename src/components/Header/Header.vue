<template>
<Logo/>
<img :src="userConnected[0].profilimage" alt="profile-picture">
<span>Bonjour, {{userConnected[0].firstname}}</span>
<Link title="Mon Profil"/>
<Button label="Déconnexion"></Button>

</template>

<script>
import Link from '../Link/Link.vue';
import Button from '../Button/Button.vue';
import Logo from '../Logo/Logo.vue';


export default {
    name: '',

    props: {
      
    },

    components: {
    Link,
    Button,
    Logo
},


    computed: {
        userConnected(){
            return JSON.parse(sessionStorage.getItem('userConnected'))
        }
    },

    watch: {

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
</style>