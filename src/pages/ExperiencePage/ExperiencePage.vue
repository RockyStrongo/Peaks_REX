<template>
    <Header></Header>
    <Transition>
        <SnackBar v-if="snackBarVisible" :snackText="snackBarText" :snackType="snackBarType"></SnackBar>
    </Transition>
    <p>{{ this.experienceData }}</p>
</template>

<script>

import Header from '../../components/Header/Header.vue';
import SnackBar from '../../components/SnackBar/SnackBar.vue';

import globalConstants from '../../const'


export default {
    name: '',

    props: {

    },

    components: {
        Header,
        SnackBar
    },


    computed: {

    },

    data() {
        return {
            experienceId: this.$route.params.experienceId,
            experienceData: Array,

            snackBarVisible: false,
            snackBarText: String,
        }

    },

    methods: {

        async getExperienceData() {
            let APIData = await this.$apollo.query({
                query: globalConstants.GQL_GET_ONE_EXPERIENCE,
                variables: {
                    id: this.experienceId,
                }
            }).catch((error) => {
                console.log(error)
                this.snackBarVisible = true
                this.snackBarText = "Erreur API : "+error
                this.snackBarType = "error"
            })

            this.experienceData = APIData.data.retour_exp


        }

    },
    mounted() {
        this.getExperienceData()
    }
}


</script>

<style lang="scss">

</style>