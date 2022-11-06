<template>
    <button @click="createData">Creer des données</button>
</template>

<script>
import gql from 'graphql-tag'

export default {
    name: '',

    props: {

    },

    components: {

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

        async createData() {

            let GQL_CREATE_EXPERIENCE = gql`
        mutation CreateExperience (
            $project: String!
            $client: String!
            $start_date: date!
            $end_date: date!
            $description_1: String!
            $description_2: String!
            $user_id: uuid!
            $agency_id: uuid!
            ) {
      insert_retour_exp_one(object: {
            project: $project, 
            client: $client, 
            start_date: $start_date, 
            end_date: $end_date, 
            description_1: $description_1,
            description_2: $description_2,
            user_id: $user_id,
            agency_id: $agency_id
    }) {
        id
      } 
    }
    `

            let GQL_CREATE_TECHNOLOGY = gql`
        mutation CreateTechnology (
            $name: String!
            ) {
      insert_technology_one(object: {
            name: $name, 
    }) {
        id
      } 
    }
    `

            let GQL_CREATE_TECHNO_EXP_MAPPING = gql`
        mutation CreateTechnoExpMapping (
            $retour_exp_id: uuid!
            $technology_id: uuid!
            ) {
      insert_retour_exp_technology_one(object: {
            retour_exp_id: $retour_exp_id, 
            technology_id: $technology_id
    }) {
        id
      } 
    }
    `

            for (let i = 200; i < 500; i++) {
                let project = "project" + i
                let client = "client" + i
                let start_date = "20220101"
                let end_date = "20220101"
                let description_1 = "description" + i
                let description_2 = "description" + i
                let user_id = "3dc24762-de4d-4468-a581-7b2614f72990"
                let agency_id = "472c3523-80ca-40fb-93cc-e41746894d29"
                let technology = "test" + i

                let APIdata = await this.$apollo.mutate({
                    mutation: GQL_CREATE_EXPERIENCE,
                    variables: {
                        project: project,
                        client: client,
                        start_date: start_date,
                        end_date: end_date,
                        description_1: description_1,
                        description_2: description_2,
                        user_id: user_id,
                        agency_id: agency_id
                    }
                }).then((response) => {
                    console.log("success")
                    let retouridcreated = response.data.insert_retour_exp_one.id

                    this.$apollo.mutate({
                        mutation: GQL_CREATE_TECHNO_EXP_MAPPING,
                        variables: {
                            retour_exp_id: retouridcreated,
                            technology_id: "b305dbc8-1807-42f8-85d4-e7a25db9c3a8"
                        }
                    }).then((response) => {
                        console.log("success")
                    })

                }).catch((error) => {
                    console.log(error)
                })
            }



        }

    },
    mounted() {

    }
}


</script>

<style lang="scss">

</style>