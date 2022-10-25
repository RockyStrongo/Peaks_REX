<template>

    <!-- SVG filled with current color from CSS -->
    <svg v-if="type=='normal'" :class="color" viewBox="0 0 1232 728" class="Logo" alt="Logo peaks" title="Logo peaks" @click="goHome">
        <use xlink:href='../../assets/images/logo-Peaks.svg#peakslogo'
            href="../../assets/images/logo-Peaks.svg#peakslogo"></use>
    </svg>


    <!-- Specific logo for login page with only A in pink -->
    <img v-if="type=='pinkA'" class="Logo"  src="../../assets/images/logo-Peaks-white-pink-A.svg" alt="Logo peaks"
        title="Logo peaks" @click="goHome">

</template>

<script>

export default {

    name: 'Logo',

    props: {
        type: {
            type: String,
            required: true,
            default: 'normal'
        },

        color: {
            type: String,
            required: false,
            default: 'Logo-pink',
        }
    },

    computed: {


    },

    methods: {
        goHome() {
            this.$router.push('/')
        }
    }

}
</script>



<style lang="scss">
@use '../../styles/colors';

.Logo {
    width: 150px;
    height: 88px;
    cursor: pointer;
}

.Logo-pink {
    color: colors.$pink;
}

.Header-logo > .Logo{
    width: inherit;
}
</style>