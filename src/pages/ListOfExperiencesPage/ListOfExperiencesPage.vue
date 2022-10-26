<template>
    <!-- Header  -->
    <Header></Header>

    <div class="ListOfExperiencesPage-grid">

        <!-- Search section  -->
        <div class="ListOfExperiencesPage-search-section">

            <!-- Title  -->
            <div class="ListOfExperiencesPage-title-container">
                <Title title="Rechercher un retour d'expérience"></Title>
                <div>ou</div>
            </div>
            <div class="ListOfExperiences-button-container">
                <Button class="Button--pink" label="Ajouter une expérience"></Button>
            </div>

            <!-- Search  -->
            <div class="ListOfExperiences-search-container">
                <input class="ListOfExperiences-search-bar-input input" placeholder="Chercher par mot clé" type="text"
                    v-model="keyword" @keyup="updateData" />
                <div class="ListOfExperiencesPage-search-icon-background"></div>
                <svg viewBox="0 0 24 25" alt="Search icon" title="Search icon"
                    class="ListOfExperiencesPage-search-icon">
                    <use xlink:href='../../assets/images/search-icon.svg#searchIcon'
                        href="../../assets/images/search-icon.svg#searchIcon">
                    </use>
                </svg>
            </div>

            <!-- Filters  -->
            <div class="ListOfExperiencesPage-filters-section">
                <span class="ListOfExperiencesPage-filters-title">
                    Filtrer les résultats
                </span>
                <div class="ListOfExperiencesPage-filters-container">
                    <div>
                        <Toggle v-model="filteredOnUser" @click="updateData" />
                        <span class="ListOfExperiencesPage-toggle-label">Mes retours d'expérience uniquement</span>
                    </div>
                    <div class="ListOfExperiencesPage-radio-container">
                        <span>Agences Peaks : </span>
                        <input type="checkbox" name="agency" id="Aix" @change="updateData">
                        <label for="aix">Aix-en-Provence</label>
                        <input type="checkbox" name="agency" id="Reims/Paris" @change="updateData">
                        <label for="reimsparis">Reims/Paris</label>
                        <input type="checkbox" name="agency" id="Lyon" @change="updateData">
                        <label for="lyon">Lyon</label>
                    </div>
                </div>
            </div>
        </div>

        <!-- List section  -->

        <div class="ListOfExperiencesPage-list-section">
            <table-lite class="ListOfExperiencesPage-table" :is-static-mode="true" :columns="tableData.columns"
                :rows="tableData.rows" :total="tableData.totalRecordCount" :sortable="tableData.sortable"
                :messages="tableData.messages" @row-clicked="test" :pageOptions="tableData.pageOptions" :pageSize="5"
                max-height="250" />
        </div>


    </div>
</template>

<script>
import Header from '../../components/Header/Header.vue';
import Title from '../../components/Title/Title.vue';
import Button from '../../components/Button/Button.vue';
import TextInput from '../../components/TextInput/TextInput.vue';

import Toggle from '@vueform/toggle';
import TableLite from "vue3-table-lite";


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
        TableLite,

    },


    data() {
        return {
            filteredOnUser: true,
            experiencesData: Array,
            tableData: Array,
            filteredOnAgency: Array,
            keyword: '',
        }
    },

    computed: {



    },

    methods: {

        agencyFilter() {
            let checkboxes = document.getElementsByName("agency")
            let agencyFilterArray = Array(0)

            checkboxes.forEach(
                function (currentValue) {
                    if (currentValue.checked) {
                        agencyFilterArray.push(currentValue.id)
                    }
                }
            )

            agencyFilterArray.length === 0
                ? this.filteredOnAgency = ["Aix", "Lyon", "Reims/Paris"]
                : this.filteredOnAgency = agencyFilterArray

            this.experiencesData = this.experiencesData.filter(item => this.filteredOnAgency.includes(item.agency))
        },

        userFilter() {
            if (this.filteredOnUser) {
                let user = JSON.parse(sessionStorage.getItem('userConnected'))
                let userId = user[0].ID
                this.experiencesData = this.experiencesData.filter(item => item.consultant === userId)
            } else if (!this.filteredOnUser) {
                this.experiencesData = this.experiencesData
            }
        },

        keywordFilter() {

            this.experiencesData = this.experiencesData.filter(item =>
                item.consultant_name.toLowerCase().includes(this.keyword.toLowerCase()) ||
                item.agency.toLowerCase().includes(this.keyword.toLowerCase()) ||
                item.project.toLowerCase().includes(this.keyword.toLowerCase()) ||
                item.client.toLowerCase().includes(this.keyword.toLowerCase()) ||
                item.start_date.toLowerCase().includes(this.keyword.toLowerCase()) ||
                item.end_date.toLowerCase().includes(this.keyword.toLowerCase()) ||
                item.technologies.toLowerCase().includes(this.keyword.toLowerCase())
            )
        },

        tableConfig() {
            this.tableData = {
                isLoading: false,
                columns: [
                    {
                        label: "Collaborateur",
                        field: "consultant_name",
                        width: "3%",
                        sortable: true,
                    },
                    {
                        label: "Agence",
                        field: "agency",
                        width: "10%",
                        sortable: true,
                    },
                    {
                        label: "Projet",
                        field: "project",
                        width: "15%",
                        sortable: true,
                    },
                    {
                        label: "Client",
                        field: "client",
                        width: "15%",
                        sortable: true,
                    },
                    {
                        label: "Date (début)",
                        field: "start_date",
                        width: "15%",
                        sortable: true,
                    },
                    {
                        label: "Date (fin)",
                        field: "end_date",
                        width: "15%",
                        sortable: true,
                    },
                    {
                        label: "Technologies",
                        field: "technologies",
                        width: "15%",
                        sortable: true,
                    },
                ],
                rows: this.experiencesData,
                totalRecordCount: this.experiencesData.length,
                sortable: {
                    order: "id",
                    sort: "asc",
                },
                messages: {
                    pagingInfo: "{0} à {1} sur {2}",
                    pageSizeChangeLabel: "Nombre par page :",
                    gotoPageLabel: "Aller à la page : ",
                    noDataAvailable: "Pas de données pour les filtres en cours",
                },
                pageOptions: [
                    {
                        value: 5,
                        text: "5"
                    },
                    {
                        value: 10,
                        text: "10"
                    },
                    {
                        value: 30,
                        text: "30"
                    },
                    {
                        value: 50,
                        text: "50"
                    }]


            }

        },

        async updateData() {

            const response = await fetch('../../src/mock-data/mock-user-data.json')
                .then(function (response) {
                    if (response.ok) {
                        return response.json()
                    } else {
                        console.log("error")
                    }
                })

            // Extract experiences data from json 
            let onlyexperiences = response.map(item => item.retour_exp)

            // Flatten the array 
            onlyexperiences = onlyexperiences.reduce((previousValue, currentValue) => {
                return previousValue.concat(currentValue);
            });

            //convert the technologies to one string
            onlyexperiences = onlyexperiences.map(function (item, array) {
                let technos = item.technologies
                let technoString = technos.reduce((previtem, currentitem) => {
                    return previtem + ", ".concat(currentitem);
                })
                item['technologies'] = technoString
                return item
            })

            this.experiencesData = onlyexperiences

            //apply user filter
            this.userFilter()

            //apply agency filter
            this.agencyFilter()

            //apply keyword filter
            this.keywordFilter()

            //fill in table config with data
            this.tableConfig()

        },

        test(rowdata) {
            alert(rowdata.project);
        }

    },
    mounted() {
        this.updateData()
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
    right: 12px;
    top: 10px;
    cursor: pointer;
    color: colors.$bluelight;
}

.ListOfExperiencesPage-search-icon-background {
    width: 40px;
    height: 40px;
    position: absolute;
    right: 5px;
    top: 2.5px;
    background-color: colors.$lightgray;
    border-radius: 50%;
    cursor: pointer;
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

.ListOfExperiencesPage-title-container>h2 {
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

.ListOfExperiencesPage-filters-section>*,
.ListOfExperiencesPage-filters-container>* {
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

.ListOfExperiencesPage-radio-container>label {
    margin: 10px;
}

.ListOfExperiencesPage-radio-container>span {
    margin: 10px;
}

.ListOfExperiencesPage-filters-title {
    text-transform: uppercase;
    text-decoration: underline;
}

.ListOfExperiencesPage-table {
    width: 90%
}

.ListOfExperiencesPage-list-section {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
}

.vtl-table .vtl-thead .vtl-thead-th {
    font-family: Catamaran;
    font-weight: bold;
    color: colors.$blue;
    background-color: colors.$lightgray;
    border-color: colors.$lightgray;
}

.vtl-table tr:nth-child(even) {
    background-color: #E7E9EF;

}

.vtl-table tr {
    font-family: Oswald;
    font-size: 16px;
    color: #68789B;
}

.vtl-table td {
    border: none;
}

.vtl-thead-column.vtl-sortable.vtl-both {
    background-image: url('../../assets/images/sort-icon.svg');
}

.vtl-thead-column.vtl-sortable.vtl-both.vtl-asc {
    background-image: url('../../assets/images/sort-up-icon.svg');
}

.vtl-thead-column.vtl-sortable.vtl-both.vtl-desc {
    background-image: url('../../assets/images/sort-down-icon.svg');
}
</style>    