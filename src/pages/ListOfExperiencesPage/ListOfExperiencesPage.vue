<template>
    <Header></Header>
    <div class="ListOfExperiencesPage-grid">
        <div class="ListOfExperiencesPage-search-section">
            <div class="ListOfExperiencesPage-title-container">
                <Title title="Rechercher un retour d'expérience"></Title>
                <Div>ou</div>
            </div>
            <div class="ListOfExperiences-button-container">
                <Button class="Button--pink" label="Ajouter une expérience"></Button>
            </div>
            <div class="ListOfExperiences-search-container">
                <input class="ListOfExperiences-search-bar-input input" placeholder="Chercher par mot clé"
                    type="text" />
                <svg viewBox="0 0 24 25" alt="Search icon" title="Search icon"
                    class="ListOfExperiencesPage-search-icon">
                    <use xlink:href='../../assets/images/search-icon.svg#searchIcon'
                        href="../../assets/images/search-icon.svg#searchIcon">
                    </use>
                </svg>
            </div>
            <div class="ListOfExperiencesPage-filters-section">

                <span class="ListOfExperiencesPage-filters-title">
                    Filtrer les résultats
                </span>
                <div class="ListOfExperiencesPage-filters-container">
                    <div>
                        <Toggle v-model="value" />
                        <span class="ListOfExperiencesPage-toggle-label">Mes retours d'expérience uniquement</span>
                    </div>
                    <div class="ListOfExperiencesPage-radio-container">
                        <span>Agences Peaks : </span>
                        <input type="checkbox" name="agency" id="Aix">
                        <label for="aix">Aix-en-Provence</label>
                        <input type="checkbox" name="agency" id="reimsparis">
                        <label for="reimsparis">Reims/Paris</label>
                        <input type="checkbox" name="agency" id="lyon">
                        <label for="lyon">Lyon</label>
                    </div>
                </div>
            </div>
        </div>
        <div>

        </div>
    </div>
</template>

<script>
import Header from '../../components/Header/Header.vue';
import Title from '../../components/Title/Title.vue';
import Button from '../../components/Button/Button.vue';
import TextInput from '../../components/TextInput/TextInput.vue';
import Toggle from '@vueform/toggle';


export default {
    name: 'ListOfExperiencesPage',

    props: {

    },

    components: {
        Header,
        Title,
        Button,
        TextInput,
        Toggle,
    },


    data() {
        return {
            value: true
        }
    },

    methods: {


    },
    mounted() {

    }
}


</script>

<style src="@vueform/toggle/themes/default.css">

</style>

<style lang="scss">
@use '../../styles/colors';

.ListOfExperiencesPage-grid {
    display: grid;
    grid-template-rows: 1fr 1fr;
    min-height: calc(100vh - 91px);
}

.ListOfExperiencesPage-search-section {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: colors.$lightgray;
    box-shadow: inset 0px -24px 109px rgba(0, 0, 0, 0.1);
}

.ListOfExperiencesPage-search-icon {
    width: 24px;
    position: absolute;
    right: 15px;
    top: 10px;
    cursor: pointer;
    background-color: colors.$lightgray;
}

.ListOfExperiences-search-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 55%;
    margin: 17px;
}

.ListOfExperiences-search-bar-input {
    width: 100%;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
    border-radius: 52px;
}

.ListOfExperiences-button-container {
    margin: 17px;
}

.ListOfExperiencesPage-title-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.ListOfExperiencesPage-title-container>h2,
div {
    color: colors.$blue;
    font-weight: bold;
}

.ListOfExperiencesPage-filters-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    margin: 10px;

}

.ListOfExperiencesPage-filters-section {
    width: 55%;
}

.ListOfExperiencesPage-filters-section>*, .ListOfExperiencesPage-filters-container>* {
    color: colors.$bluelight;
    font-family: Oswald;
    font-weight: 400;
}

.ListOfExperiencesPage-toggle-label {
    margin-left: 10px;
}

.ListOfExperiencesPage-radio-container {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.ListOfExperiencesPage-radio-container > label {
   margin: 10px;
}

.ListOfExperiencesPage-radio-container > span {
   margin: 10px;
}

.ListOfExperiencesPage-filters-title{
    text-transform: uppercase;
    text-decoration: underline;
}
</style>