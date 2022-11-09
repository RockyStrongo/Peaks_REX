<template>
    <div class="Header">

        <div class="Header-logo">
            <Logo type="normal" />
        </div>

        <!-- Profile Picture -->
        <div class="Header-profileDiv">

            <!-- if a picture exists  -->
            <div v-if="userConnected[0].profilimage">
                <img class="Header-profilePicture" :src="userConnected[0].profilimage" alt="profile-picture">
            </div>

            <!-- default if no picture  -->
            <div v-if="!userConnected[0].profilimage" class="Header-defaultProfilePictureBackground">
                <svg  viewBox="0 0 32 32" class="Header-defaultProfilePicture" alt="Default profile picture"
                    title="Default profile picture">
                    <use xlink:href='../../assets/images/default-profile-picture.svg#defaultprofilepic'
                        href="../../assets/images/default-profile-picture.svg#defaultprofilepic"></use>
                </svg>
            </div>
            <span :v-if="userConnected">Bonjour, {{ userConnected[0].firstname }}</span>
        </div>


        <div class="vertical-line"></div>

        <Link class='Header-profileLink' title="Mon Profil" @click="goToProfilePage" />

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

        userConnected() {
            let userObject = JSON.parse(sessionStorage.getItem('userConnected'))
            return userObject
        },

    },
    methods: {
        disconnect() {
            sessionStorage.removeItem('userConnected');
            this.$router.push('/login')
        },
        goToProfilePage() {
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

.Header-defaultProfilePicture{
    height: 17.5px;
    color: white;
}

.Header-defaultProfilePictureBackground{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    width: 32px;
    background-color: colors.$bluelight;
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
    font-weight: 700;
}

.Header-profileDiv {
    display: flex;
    align-items: center;
}
</style>