<template>
    <form @submit="createExperience">
        <SnackBar v-if="snackBarVisible" :snackText="snackBarText" :snackType="snackBarType"></SnackBar>
        <TextInput label="Nom du projet" :is-required="true" field="project"></TextInput>
        <TextInput label="Client" :is-required="true" field="client"></TextInput>
        <DateInput label="Date de début" field="startDate" :is-required="true"></DateInput>
        <DateInput label="Date de fin" field="endDate" :is-required="true"></DateInput>
        <SelectInput label="Agence de rattachement" :items="agencies" :is-required="true" field="agency"></SelectInput>
        <TagInput label="Technologies" :is-required="true" :tagOptions="technologies" field="technologiesInput">
        </TagInput>
        <TextInput label="Description du projet" :is-required="true" field="description1"></TextInput>
        <TextInput label="Réalisé par Peaks" :is-required="true" field="description2"></TextInput>
        <TextInput label="Challenges" :is-required="true" field="description3"></TextInput>
        <Button label="Valider"></Button>
        <Button label="Générer PDF"></Button>
    </form>
</template>

<script>

import TextInput from '../TextInput/TextInput.vue';
import DateInput from '../DateInput/DateInput.vue';
import SelectInput from '../SelectInput/SelectInput.vue';
import Button from '../Button/Button.vue';
import TagInput from '../TagInput/TagInput.vue';
import SnackBar from '../SnackBar/SnackBar.vue';

import globalConstants from '../../const'


export default {
    name: 'NewExperienceForm',

    props: {

    },

    components: {
        TextInput,
        DateInput,
        SelectInput,
        Button,
        SnackBar,
        TagInput
    },


    computed: {

    },

    watch: {

    },

    data() {
        return {
            formFields: ["project", "client", "startDate", "endDate", "agency", "technologiesInput", "description1", "description2", "description3"],

            agencies: globalConstants.AGENCY_OPTIONS,

            snackBarVisible: false,
            snackText: String,
            snacktype: String,

            technologies: [],

            project: String,
            client: String,
            startDate: Date,
            endDate: Date,
            agency: String,
            technologiesInput: Array,
            description1: String,
            description2: String,
            description3: String
        }

    },

    methods: {
        getFormDatafromEmitter(item) {
            const fieldname = item.field.toString()
            this[fieldname] = item.value
        },
        async getTechnologies() {
            let APIData = await this.$apollo.query({
                query: globalConstants.GQL_GET_TECHNOLOGIES,
            }).catch((error) => {
                console.log(error)
                this.snackBarVisible = true
                this.snackBarText = "Erreur API : " + error
                this.snackBarType = "error"
            })

            let APItechnologies = APIData.data.technology

            APItechnologies.map((item) => {
                let newitem = {}
                newitem.name = item.name
                newitem.code = item.id

                this.technologies.push(newitem)
            })
        },
        async createExperience(e) {

            e.preventDefault();

            let user = JSON.parse(sessionStorage.getItem('userConnected'))
            let userID = user[0].id
            let userAgencyID = user[0].agency_id

            // let APIdataExp = await this.$apollo.mutate({
            //     mutation: globalConstants.GQL_CREATE_EXPERIENCE,
            //     variables: {
            //         project: this.project,
            //         client: this.client,
            //         start_date: this.startDate,
            //         end_date: this.endDate,
            //         description_1: this.description1,
            //         description_2: this.description2,
            //         user_id: userID,
            //         agency_id: userAgencyID
            //     }
            // }).catch((error) => {
            //     this.snackBarVisible = true
            //     this.snackBarText = "Erreur API : "+error
            //     this.snackBarType = "error"
            // })

            // let experienceCreatedId = APIdataExp.data.insert_retour_exp_one.id

            let technologiesToMap = await this.getTechnologiestoMap()
            
            console.log(technologiesToMap)

            technologiesToMap.forEach((item) => {
                console.log(item)
            }
            )

            // technologiesToMap.forEach((item) => {
            //     this.createExpTechMapping(experienceCreatedId, item)
            // }
            // )
        },

        async createTechnology(technologyName) {
            let APIdataTech = await this.$apollo.mutate({
                mutation: globalConstants.GQL_CREATE_TECHNOLOGY,
                variables: {
                    name: technologyName
                }
            }).catch((error) => {
                console.log(error)
            })

            return APIdataTech.data.insert_technology_one.id

        },

        async createExpTechMapping(experienceId, technologyId) {
            let APIdataMap = await this.$apollo.mutate({
                mutation: globalConstants.GQL_CREATE_TECHNO_EXP_MAPPING,
                variables: {
                    retour_exp_id: experienceId,
                    technology_id: technologyId
                }
            }).catch((error) => {
                this.snackBarVisible = true
                this.snackBarText = "Erreur API : " + error
                this.snackBarType = "error"
                return false
            })

            return APIdataMap.data.insert_retour_exp_technology_one.id
        },

        async getTechnologiestoMap() {

            let technologiesToMap = []

            this.technologiesInput.forEach(async (item) => {

                if (item.code.substring(0, 3) === "new") {
                    let techID = await this.createTechnology(item.name)
                    technologiesToMap.push(techID)
                }
                else {
                    technologiesToMap.push(item.code)
                }
            }
            )

            return technologiesToMap
        }
    },
    mounted() {
        this.formFields.forEach(item =>

            this.emitter.on(item, this.getFormDatafromEmitter))

        this.getTechnologies()
    }
}


</script>

<style lang="scss">

</style>