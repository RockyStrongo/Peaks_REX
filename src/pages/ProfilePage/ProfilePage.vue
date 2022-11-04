<template>
    <!-- Header  -->
    <Header></Header>

    <div class="ProfilePage-gridContainer">

        <div class="ProfilePage-title">
            <Title title="Modifier mon profil"></Title>
            <!-- <Button label="Modifier"></Button> -->
            <div class="ProfilePage-imageTitleContainer">
                <img class="ProfilePage-profileImage" :src="profilPicExists" alt="profile-picture">
                <Title :title="firstName + ' ' + lastName" class="ProfilePage-nameTitle"></Title>

            </div>
        </div>
        <div class="ProfilePage-emptyRow"></div>
        <div class="ProfilePage-content">
            <form class="ProfilePage-form">
                <TextInput label="Nom" placeholder="Nom" :isRequired="true" field="lastName" :value="lastName" />

                <TextInput label="Prénom" placeholder="Prénom" :isRequired="true" field="firstName"
                    :value="firstName" />

                <SelectInput :items="agencyOptions" label="Agence de rattachement" :isRequired="true" field="agency"
                    :value="agency">
                </SelectInput>

                <EmailInput label="Email" :isRequired="true" field="email" :value="email" />

                <Button label="Valider" @click="updateUser"></Button>
            </form>

        </div>
    </div>



</template>

<script>
import Header from '../../components/Header/Header.vue'
import TextInput from '../../components/TextInput/TextInput.vue'
import EmailInput from '../../components/EmailInput/EmailInput.vue';
import SelectInput from '../../components/SelectInput/SelectInput.vue';
import PasswordInput from '../../components/PasswordInput/PasswordInput.vue';
import Button from '../../components/Button/Button.vue';
import Title from '../../components/Title/Title.vue';


import globalConstants from '../../const'

export default {
    name: 'ProfilPage',

    components: {
        Header,
        TextInput,
        EmailInput,
        SelectInput,
        Button,
        PasswordInput,
        Title
    },


    computed: {
        userID() {
            let userConnected = JSON.parse(sessionStorage.getItem('userConnected'))
            return userConnected[0].id
        },
        updatedAgencyID() {
            switch (this.agency) {
                case "Aix-en-Provence":
                    return globalConstants.AGENCY_IDS.Aix
                case "Lyon":
                    return globalConstants.AGENCY_IDS.Lyon
                case "Reims/Paris":
                    return globalConstants.AGENCY_IDS.ReimsParis
                default:
                    console.log("Error: agency ID not found");
                    return false
            }
        },

        profilPicExists() {
            if (!this.profileImageURL) {
                return "../../src/assets/images/default-profile-picture.svg"
            } else {
                return this.profileImageURL
            }
        }
    },

    data() {
        return {
            formFields: ["lastName", "firstName", "agency", "email"],

            agencyOptions: globalConstants.AGENCY_OPTIONS,
            userData: Array,
            firstName: "",
            lastName: "",
            profileImageURL: "",
            email: "",
            password: "",
            agency: "",
        }

    },


    methods: {

        async getUserData() {

            let APIData = await this.$apollo.query({
                query: globalConstants.GQL_GET_USER_PROFILE_DATA,
                variables: {
                    id: this.userID,
                }
            })

            this.userData = APIData.data.user

            this.firstName = this.userData[0].firstname
            this.lastName = this.userData[0].lastname
            this.email = this.userData[0].email
            this.password = this.userData[0].password
            this.agencyID = this.userData[0].agency.id
            this.profileImageURL = this.userData[0].profilimage

            switch (this.agencyID) {
                case globalConstants.AGENCY_IDS.Aix:
                    this.agency = "Aix-en-Provence"
                    break
                case globalConstants.AGENCY_IDS.Lyon:
                    this.agency = "Lyon"
                    break
                case globalConstants.AGENCY_IDS.ReimsParis:
                    this.agency = "Reims/Paris"
                    break
                default:
                    console.log("Error: agency ID not found");
            }
        },

        async updateUser() {
            let APIData = await this.$apollo.mutate({
                mutation: globalConstants.GQL_UPDATE_USER,
                variables: {
                    id: this.userID,
                    email: this.email,
                    firstname: this.firstName,
                    lastname: this.lastName,
                    agency_id: this.updatedAgencyID
                }
            }).then(() => {
                //change to snackbar
                console.log("success")
            }).catch((error) => {
                //change to snackbar
                console.log("error: " + error)
            })
        },

        getFormDatafromEmitter(item) {
            const fieldname = item.field.toString()
            this[fieldname] = item.value
        }

    },
    mounted() {
        this.getUserData()

        this.formFields.forEach(item =>

            this.emitter.on(item, this.getFormDatafromEmitter))
    }
}


</script>

<style lang="scss">
@use '../../styles/colors';

.ProfilePage-gridContainer {
    display: grid;
    grid-template-rows: 2fr 1fr 7fr;
    min-height: calc(100vh - 91px);
}

.ProfilePage-title {
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: colors.$blue;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    color: colors.$white;
}

.ProfilePage-profileImage {
    border-radius: 50%;
}

.ProfilePage-nameTitle {
    color: colors.$blue;
    margin-left: 20px;
    margin-bottom: 15px;
}

.ProfilePage-imageTitleContainer {
    position: absolute;
    display: flex;
    flex-direction: row;
    left: 5%;
    bottom: -45%;
    align-items: flex-end;
}

.ProfilePage-form{
    width: 50%;
    margin: 10px;
}

.ProfilePage-content, .ProfilePage-emptyRow{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: colors.$gray;
}
</style>