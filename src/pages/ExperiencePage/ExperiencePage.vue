<template>
    <Header></Header>
    <div class="ExperiencePage-title">
        <Title :title="title"></Title>
    </div>
    <div class="ExperiencePage-gridContainer">
        <Transition>
            <SnackBar v-if="snackBarVisible" :snackText="snackBarText" :snackType="snackBarType"></SnackBar>
        </Transition>
        <div>
            <NewExperienceForm :currentExperience="experienceId"></NewExperienceForm>
        </div>
        <div class="ExperiencePreview-container" id="preview">

            <div class="ExperiencePreview-left">
                <!-- if a picture exists  -->
                <div v-if="userConnectedImage">
                    <img class="ExperiencePreview-image" :src="userConnectedImage" alt="profile-picture">
                </div>

                <!-- default if no picture  -->
                <div v-if="!userConnectedImage" class="ExperiencePreview-defaultImageBackground">
                    <svg viewBox="0 0 32 32" class="ExperiencePreview-defaultImage" alt="Default profile picture"
                        title="Default profile picture">
                        <use xlink:href='../../assets/images/default-profile-picture.svg#defaultprofilepic'
                            href="../../assets/images/default-profile-picture.svg#defaultprofilepic"></use>
                    </svg>
                </div>

            </div>

            <div class="ExperiencePreview-right">
                <div class="ExperiencePreview-nameTechnoContainer">
                    <p class="ExperiencePreview-name">{{ userConnectedName }}</p>
                    <div v-for="item in technologiesInput" :key="item.code" class="ExperiencePreview-technoTag"> {{
                            item.name
                    }}</div>
                </div>
                <p class="ExperiencePreview-content"> <span class="ExperiencePreview-label">Projet : </span> <span>{{
                        project
                }} </span></p>
                <p class="ExperiencePreview-content"><span class="ExperiencePreview-label">Client : </span> {{ client }}
                </p>
                <p class="ExperiencePreview-content"> <span class="ExperiencePreview-label">Du</span> {{ startDateIfSet }}
                    <span class="ExperiencePreview-label">au</span> {{ endDateIfSet }}
                </p>
                <p class="ExperiencePreview-content ExperiencePreview-description">{{ description1 }}</p>

            </div>

            <div class="ExperiencePreview-buttons">
                <Button label="Générer image" @click="GetImage"></Button>
                <a download="hello.png" v-if="imageURL" :href="imageURL">Download</a>
            </div>



        </div>

    </div>

</template>

<script>

import Header from '../../components/Header/Header.vue';
import SnackBar from '../../components/SnackBar/SnackBar.vue';
import Title from '../../components/Title/Title.vue';
import NewExperienceForm from '../../components/NewExperienceForm/NewExperienceForm.vue';
import Button from '../../components/Button/Button.vue';

import * as htmlToImage from 'html-to-image';

import globalConstants from '../../const'


export default {
    name: '',

    props: {

    },

    components: {
        Header,
        SnackBar,
        NewExperienceForm,
        Button,
        Title
    },


    computed: {
        isNewExperience() {
            if (this.$route.params.experienceId === "new") {
                return true
            } else {
                return false
            }
        },
        title() {
            if (this.isNewExperience) {
                return "Nouveau retour d'expérience"
            } else {
                return "Retour d'expérience"
            }
        },
        startDateIfSet(){
            if(!this.startDate){
                return " "
            } else {
                return this.startDate
            }
        },
        endDateIfSet(){
            if(!this.endDate){
                return " "
            } else {
                return this.endDate
            }
        },
        userConnectedName() {
            let user = JSON.parse(sessionStorage.getItem('userConnected'))
            return user[0].firstname + " " + user[0].lastname
        },
        userConnectedImage() {
            let user = JSON.parse(sessionStorage.getItem('userConnected'))
            return user[0].profilimage
        },

    },

    data() {
        return {
            formFields: ["project", "client", "startDate", "endDate", "agency", "technologiesInput", "description1", "description2"],

            experienceId: this.$route.params.experienceId,
            experienceData: Array,

            snackBarVisible: false,
            snackBarText: String,

            project: "",
            client: "",
            startDate: "",
            endDate: "",
            agency: "",
            technologiesInput: Array,
            description1: "",
            description2: "",

            imageURL: "",
        }

    },

    methods: {


        getFormDatafromEmitter(item) {
            const fieldname = item.field.toString()
            this[fieldname] = item.value
        },

        async GetImage() {
            var node = document.getElementById('preview');

            let data = await htmlToImage.toPng(node)
                .catch(function (error) {
                    console.error('oops, something went wrong!', error);
                });

            this.imageURL = data

        },
        getExperienceFormData(item){
            const fieldname = item.field.toString()
            this[fieldname] = item.value
        }

    },
    mounted() {
        this.formFields.forEach(item =>

            this.emitter.on(item, this.getFormDatafromEmitter))

            this.emitter.on("ExperienceForm", this.getExperienceFormData)

    }

    
}


</script>

<style lang="scss">
@use '../../styles/colors';
@use '../../styles/variables';

.ExperiencePage-gridContainer {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: minmax(calc(100vh - 91px - 10vh), 100%);
}

.ExperiencePreview-container {
    margin: 15px;
    display: grid;
    grid-template-columns: 175px calc(100% - 175px);
    grid-template-rows: 100%;
    font-family: Catamaran;
    border-color: colors.$bluelight;
    height: fit-content;
    background-color: colors.$lightgray;
    box-shadow: inset 0px -24px 109px rgba(0, 0, 0, 0.1);
}

.ExperiencePreview-left {
    display: flex;
    align-items: center;
    justify-content: center;
}

.ExperiencePreview-image {
    border-radius: 50%;
    width: 130px;
    box-shadow: variables.$boxshadow;
}

.ExperiencePreview-name {
    margin-top: 15px;
    font-size: 38px;
    font-weight: 600;
    margin-right: 5px;
    color: colors.$blue;
}

.ExperiencePreview-nameTechnoContainer {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
}

.ExperiencePreview-technoTag {
    background-color: colors.$pink;
    color: white;
    margin: 5px;
    border-radius: 10%;
    align-self: center;
    padding: 3px;
    font-size: 12px;
}

.ExperiencePreview-content {
    color: colors.$bluelight;
    margin-top: 3px;
    margin-bottom: 3px;
}

.ExperiencePreview-label {
    font-weight: 700;
    color: colors.$blue;
}

.ExperiencePreview-description {
    margin-top: 10px;
    margin-right: 15px;
    text-align: justify;
}

.ExperiencePreview-defaultImage {
    height: 80px;
    width: 80px;
    color: white;
}

.ExperiencePreview-defaultImageBackground {
    height: 130px;
    width: 130px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: colors.$bluelight;
    border-radius: 50%;
    margin-right: 13px;
    box-shadow: variables.$boxshadow;
}

.ExperiencePreview-buttons {
    margin: 10px;
}

.ExperiencePage-title {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 10vh;
    background-color: colors.$blue;
    color: white;
    box-shadow: variables.$boxshadow;
}
</style>