<template>
    <form @submit="handleSubmit" class="NewExperienceForm">

        <div class="NewExperienceForm-snack">
            <SnackBar v-if="snackBarVisible" :snackText="snackBarText" :snackType="snackBarType"></SnackBar>
        </div>
        <div class="NewEperienceForm-row">
            <TextInput class="NewEperienceForm-input NewEperienceForm-inputTwoElements " label="Nom du projet"
                placeholder="Projet" :is-required="true" field="project">
            </TextInput>
            <TextInput class="NewEperienceForm-input NewEperienceForm-inputTwoElements " label="Client"
                placeholder="Client" :is-required="true" field="client"></TextInput>
        </div>
        <div class="NewEperienceForm-row">
            <DateInput class="NewEperienceForm-input NewEperienceForm-inputTwoElements" label="Date de début"
                field="startDate" :is-required="true"></DateInput>
            <DateInput class="NewEperienceForm-input NewEperienceForm-inputTwoElements" label="Date de fin"
                field="endDate" :is-required="true"></DateInput>
        </div>
        <TagInput class="NewEperienceForm-input" label="Technologies" :is-required="true" :tagOptions="technologies"
            field="technologiesInput">
        </TagInput>
        <TextAreaInput class="NewEperienceForm-input" label="Description du projet" placeholder="Description du projet"
            :is-required="true" field="description1"></TextAreaInput>
        <div class="NewExperienceForm-buttonContainer">
            <Button class="NewExperienceForm-button" label="Valider"></Button>
        </div>
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
import TextAreaInput from '../TextAreaInput/TextAreaInput.vue';


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
        TagInput,
        TextAreaInput
    },


    computed: {

    },

    watch: {

    },

    data() {
        return {
            formFields: ["project", "client", "startDate", "endDate", "technologiesInput", "description1"],

            formIsValid: false,

            snackBarVisible: false,
            snackText: String,
            snacktype: String,

            technologies: [],
            newTechnologies: [],

            project: String,
            client: String,
            startDate: Date,
            endDate: Date,
            technologiesInput: Array,
            description1: String,

            experienceCreatedId: String
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
                return false
            })

            let APItechnologies = APIData.data.technology

            APItechnologies.map((item) => {
                let newitem = {}
                newitem.name = item.name
                newitem.code = item.id

                this.technologies.push(newitem)
            })
        },
        async createExperience() {

            let user = JSON.parse(sessionStorage.getItem('userConnected'))
            let userID = user[0].id
            let userAgencyID = user[0].agency_id

            let APIdataExp = await this.$apollo.mutate({
                mutation: globalConstants.GQL_CREATE_EXPERIENCE,
                variables: {
                    project: this.project,
                    client: this.client,
                    start_date: this.startDate,
                    end_date: this.endDate,
                    description_1: this.description1,
                    user_id: userID,
                    agency_id: userAgencyID
                }
            }).catch((error) => {
                this.snackBarVisible = true
                this.snackBarText = "Erreur API : " + error
                this.snackBarType = "error"
            })

            let experienceCreatedId = APIdataExp.data.insert_retour_exp_one.id

            // this.experienceCreatedId = experienceCreatedId;

            let technologiesToCreate = []
            let existingTechnologies = []

            this.technologiesInput.forEach((item) => {

                if (item.code.substring(0, 3) === "new") {
                    technologiesToCreate.push(item.name)
                } else {
                    existingTechnologies.push(item.code)
                }
            }
            )

            technologiesToCreate.forEach(
                (item) => {
                    this.$apollo.mutate({
                        mutation: globalConstants.GQL_CREATE_TECHNOLOGY,
                        variables: {
                            name: item
                        }
                    }).then((response) => {
                        let techID = response.data.insert_technology_one.id
                        let mapping = this.createExpTechMapping(experienceCreatedId, techID)
                    })
                        .catch((error) => {
                            console.log(error)
                        })

                }
            )

            existingTechnologies.forEach(
                (item) => {
                    this.createExpTechMapping(experienceCreatedId, item)
                }
            )

        },
        async handleSubmit(e) {
            e.preventDefault();

            this.validateForm()

            if (this.formIsValid) {
                let wait = await this.createExperience()
                this.$router.replace("/experience/" + this.experienceCreatedId)
            }
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
            }
            )

            return technologiesToMap
        },

        validateForm() {

            if (this.startDate >= this.endDate) {
                this.formIsValid = false
                this.snackBarVisible = true
                this.snackBarText = globalConstants.ERROR_MESSAGE_END_DATE_BEFORE_START_DATE
                this.snackBarType = "error"
            } else {
                this.formIsValid = true
            }


            this.formFields.forEach(item => {
                if (this[item].length == 0) {
                    this.formIsValid = false
                    this.snackBarVisible = true
                    this.snackBarText = globalConstants.ERROR_MESSAGE_REQUIRED_FIELDS
                    this.snackBarType = "error"
                }
            }
            )
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
.NewEperienceForm-row {
    display: flex;
    // margin: 10px;
}

.NewEperienceForm-input {
    margin: 10px 10px 0px 10px;
}

.NewEperienceForm-inputTwoElements {
    width: 50%;
}

.NewExperienceForm-buttonContainer {
    display: flex;
    justify-content: center;
}

.NewExperienceForm-button {
    width: 50%;
    margin-bottom: 10px;
}

.NewExperienceForm-snack {
    margin: 10px 0px 10px 10px;
}
</style>