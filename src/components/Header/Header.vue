<template>
    <div class="Header">

        <div class="Header-logo">
            <Logo type="normal" />
        </div>

        <div class="Header-profile-div">
            <img :v-if="userConnected" class="Header-profile-picture" :src="userConnected[0].profilimage"
                alt="profile-picture">

            <span :v-if="userConnected">Bonjour, {{ userConnected[0].firstname }}</span>
        </div>


        <div class="vertical-line"></div>

        <Link class='Header-profile-link' title="Mon Profil" />

        <Button class='Button--bluelight' label="Déconnexion"></Button>

    </div>


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
@import url('Header.css');
</style>