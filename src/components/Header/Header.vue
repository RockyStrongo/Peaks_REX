<template>
    <div class="Header">

        <div class="Header-logo">
            <Logo type="normal" />
        </div>

        <div class="Header-profileDiv">
            <img 
            :v-if="userConnected" 
            class="Header-profilePicture" 
            :src="profilPicExists"
            alt="profile-picture">

            <span :v-if="userConnected" >Bonjour, {{ userConnected[0].firstname }}</span>
        </div>


        <div class="vertical-line"></div>

        <Link class='Header-profileLink' title="Mon Profil" @click="goToProfilePage"/>

        <Button class='Button--bluelight' label="Déconnexion" @click="disconnect"></Button>

    </div>


</template>

<script>
import Link from '../Link/Link.vue';
import Button from '../Button/Button.vue';
import Logo from '../Logo/Logo.vue';


export default {
    name: 'Header',

    components: {
        Link,
        Button,
        Logo
    },

    computed: {

        userConnected(){
            let userObject = JSON.parse(sessionStorage.getItem('userConnected'))
            return userObject
        },

        profilPicExists(){
            if(!this.userConnected[0].profilimage){
                return "../../src/assets/images/default-profile-picture.svg"
            } else {
                return this.userConnected[0].profilimage
            }
        }
    },
    methods: {
        disconnect(){
            sessionStorage.removeItem('userConnected');
            this.$router.push('/login')
        },
        goToProfilePage(){
            this.$router.push('/profile')
        }
    },
}

</script>

<style lang="scss">
@use '../../styles/colors';
@use '../../styles/variables';


.Header {
    font-family: Catamaran;
    color: colors.$bluelight;
    height: 91px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    box-shadow: variables.$boxshadow;
}

.Header>* {
    margin: 29px;
}

.Header-logo {
    margin-right: auto;
    width: 81px;
}

.Header-profilePicture {
    height: 32px;
    border-radius: 50%;
    margin-right: 13px;
}

.Header-button {
    height: fit-content;
}

.vertical-line {
    border-left: 2px solid colors.$bluelight;
    height: 45%;
}

.Header-profileLink {
    color: colors.$blue;
    font-weight: 700    ;
}

.Header-profileDiv{
    display: flex;
    align-items: center;
}
</style>