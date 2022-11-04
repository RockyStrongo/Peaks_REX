<template>
    <Header></Header>
    <p>{{ this.experienceData }}</p>
</template>

<script>

import Header from '../../components/Header/Header.vue';

import globalConstants from '../../const'


export default {
    name: '',

    props: {

    },

    components: {
        Header,
    },


    computed: {

    },

    data() {
        return {
            experienceId: this.$route.params.experienceId,
            experienceData: Array,
        }

    },

    methods: {

        async getExperienceData(){
            let APIData = await this.$apollo.query({
                query: globalConstants.GQL_GET_ONE_EXPERIENCE ,
                variables: {
                    id: this.experienceId,
                }
            }).catch((error) => {
                this.snackBarVisible = true
                this.snackBarText = error
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