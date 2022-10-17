<template>

    <div class="grid-container">

        <!-- left column -->
        <div class="grid-item-left"></div>

        <!-- right column -->
        <div class="grid-item-right">

            <div class="flex-container">

                <Logo />
                <ConnectionForm />

            </div>

            <!-- Recover password link -->
            <div class="bottom-right">
                <a href="/" class="link link--small">Vous avez perdu votre mot de passe ?</a>
            </div>

        </div>
    </div>

</template>

<script>

import ConnectionForm from '../ConnectionForm/ConnectionForm.vue';
import Logo from '../Logo/Logo.vue';


export default {
    name: 'LoginPage',

    components: {
    ConnectionForm,
    Logo
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
.grid-item-left {
    background: linear-gradient(rgba(25, 40, 74, 0.45),
            rgba(25, 40, 74, 0.45)), url(../assets/images/montagne.jpg)no-repeat;
    background-size: cover;
}

.grid-item-right {
    display: grid;
    grid-template-rows: 9fr 1fr;
    background: #19284A;
}

.grid-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 100vh;
}

.flex-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    grid-row: 1 / 3;
    grid-column: 1/2;
    max-width: 330px;
    width: 100%;
    margin: 0 auto;
}

.bottom-right {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    grid-column: 1/2;
    grid-row: 2/3;
    margin-right: 15px;
    margin-bottom: 17px;
}

.bottom-right .link {
    color: #fff;
}
</style>