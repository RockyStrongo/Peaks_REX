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
                <input class="ListOfExperiences-search-bar-input input" placeholder="Chercher par mot clé" type="text" />
                <svg viewBox="0 0 24 25" alt="Search icon" title="Search icon"
                    class="ListOfExperiencesPage-search-icon">
                    <use xlink:href='../../assets/images/search-icon.svg#searchIcon'
                        href="../../assets/images/search-icon.svg#searchIcon">
                    </use>
                </svg>
            </div>
            <div>
                Filtrer les résultats
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


export default {
    name: 'ListOfExperiencesPage',

    props: {

    },

    components: {
        Header,
        Title,
        Button,
        TextInput
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

.ListOfExperiencesPage-title-container{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.ListOfExperiencesPage-title-container > h2, div {
    color : colors.$blue;
    font-weight: bold;
}

</style>