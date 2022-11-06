<template>
    <!-- Header  -->
    <Header></Header>

    <div class="ListOfExperiencesPage-grid">

        <!-- Search section  -->
        <div class="ListOfExperiencesPage-searchSection">

            <!-- Title  -->
            <div class="ListOfExperiencesPage-titleContainer">
                <Title title="Rechercher un retour d'expérience"></Title>
                <div>ou</div>
            </div>
            <div class="ListOfExperiences-buttonContainer">
                <Button class="Button--pink" label="Ajouter une expérience"></Button>
            </div>

            <!-- Search  -->
            <div class="ListOfExperiences-searchContainer">
                <input class="ListOfExperiences-searchBarInput input" placeholder="Chercher par mot clé" type="text"
                    v-model="keyword" @keyup="updateData" />
                <div class="ListOfExperiencesPage-searchIconBackground"></div>
                <svg viewBox="0 0 24 25" alt="Search icon" title="Search icon" class="ListOfExperiencesPage-searchIcon">
                    <use xlink:href='../../assets/images/search-icon.svg#searchIcon'
                        href="../../assets/images/search-icon.svg#searchIcon">
                    </use>
                </svg>
            </div>

            <!-- Filters  -->
            <div class="ListOfExperiencesPage-filtersSection">
                <span class="ListOfExperiencesPage-filtersTitle">
                    Filtrer les résultats
                </span>
                <div class="ListOfExperiencesPage-filtersContainer">
                    <div>
                        <Toggle v-model="filteredOnUser" @click="updateData" />
                        <span class="ListOfExperiencesPage-toggleLabel">Mes retours d'expérience uniquement</span>
                    </div>
                    <div class="ListOfExperiencesPage-radioContainer">
                        <span>Agences Peaks : </span>
                        <input type="checkbox" name="agency" ref="agency" :id="agencyIds.Aix" @change="updateData">
                        <label for="aix">Aix-en-Provence</label>
                        <input type="checkbox" name="agency" ref="agency" :id="agencyIds.ReimsParis"
                            @change="updateData">
                        <label for="reimsparis">Reims/Paris</label>
                        <input type="checkbox" name="agency" ref="agency" :id="agencyIds.Lyon" @change="updateData">
                        <label for="lyon">Lyon</label>
                    </div>
                </div>
            </div>
        </div>

        <!-- List section  -->

        <div class="ListOfExperiencesPage-listSection">
            <table-lite class="ListOfExperiencesPage-table" ref="table" :is-static-mode="true"
                :columns="tableData.columns" :rows="tableData.rows" :total="tableData.totalRecordCount"
                :sortable="tableData.sortable" :messages="tableData.messages" @row-clicked="goToExperiencePage"
                :pageOptions="tableData.pageOptions" :pageSize="5" :max-height="250"
                rowClasses="ListOfExperiencesPage-tableHover" />
        </div>


    </div>
</template>

<script>
import Header from '../../components/Header/Header.vue';
import Title from '../../components/Title/Title.vue';
import Button from '../../components/Button/Button.vue';
import TextInput from '../../components/TextInput/TextInput.vue';

import globalConstants from '../../const'

//Toggle library
import Toggle from '@vueform/toggle';
//Sortable table library
import TableLite from "vue3-table-lite";


export default {
    name: 'ListOfExperiencesPage',

    components: {
        Header,
        Title,
        Button,
        TextInput,
        Toggle,
        TableLite,

    },

    apollo: {
        retour_exp() {
            return {
                query: globalConstants.GQL_GET_EXPERIENCES
            }
        }
    },

    data() {
        return {
            retour_exp: String,

            filteredOnUser: true,
            experiencesData: [Array],
            filteredOnAgency: Array,
            keyword: '',
            agencyIds: {
                Aix: "472c3523-80ca-40fb-93cc-e41746894d29",
                Lyon: "ad8cc137-ed55-463c-a232-0f5483c1d5f0",
                ReimsParis: "f756adc3-9d4f-44c3-aca2-cc4901705c60"
            },
        }
    },

    computed: {
        tableData() {
            return {
                isLoading: false,
                columns: [
                    {
                        label: "Collaborateur",
                        field: "consultantName",
                        width: "15%",
                        sortable: true,
                    },
                    {
                        label: "Agence",
                        field: "agencyName",
                        width: "15%",
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
                    pageSizeChangeLabel: "Nombre par page : ",
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

        }
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
                ? this.filteredOnAgency = [this.agencyIds.Aix, this.agencyIds.Lyon, this.agencyIds.ReimsParis]
                : this.filteredOnAgency = agencyFilterArray

            this.experiencesData = this.experiencesData.filter(item => this.filteredOnAgency.includes(item.agency.id))
        },

        userFilter() {
            if (this.filteredOnUser) {
                let user = JSON.parse(sessionStorage.getItem('userConnected'))
                let userId = user[0].id
                this.experiencesData = this.experiencesData.filter(item => item.user.id === userId)
            } else if (!this.filteredOnUser) {
                this.experiencesData = this.experiencesData
            }
        },

        keywordFilter() {

            this.experiencesData = this.experiencesData.filter(item =>
                item.consultantName.toLowerCase().includes(this.keyword.toLowerCase()) ||
                item.agencyName.toLowerCase().includes(this.keyword.toLowerCase()) ||
                item.project.toLowerCase().includes(this.keyword.toLowerCase()) ||
                item.client.toLowerCase().includes(this.keyword.toLowerCase()) ||
                item.technologies.toLowerCase().includes(this.keyword.toLowerCase())
            )

        },

        async updateData() {

            let wait = await this.$apollo.query({
                query: globalConstants.GQL_GET_EXPERIENCES,
            })

            let processedData = []

            this.retour_exp.map(function (item) {

                //make a copy as originial object is not extensible
                let itemcopy = Object.assign([], item);

                //concatenate first name and last name
                let fullName = item.user.firstname + " " + item.user.lastname
                itemcopy.consultantName = fullName

                //move agency name to first level
                let agencyName = item.agency.name
                itemcopy.agencyName = agencyName

                //concatenate technologies in one string
                let technoString = []
                if (item.retour_exp_technologies.length > 1) {
                    technoString = item.retour_exp_technologies.reduce((previtem, currentitem) => {
                        return previtem.technology.name + ", ".concat(currentitem.technology.name);
                    })
                } else {
                    technoString = item.retour_exp_technologies.map(item => item.technology.name)
                    technoString = technoString[0]
                }

                itemcopy.technologies = technoString

                processedData.push(itemcopy)
            })

            this.experiencesData = processedData

            //apply user filter
            this.userFilter()

            //apply agency filter
            this.agencyFilter()

            //apply keyword filter
            this.keywordFilter()

        },

        goToExperiencePage(rowdata) {
            this.$router.push("/experience/" + rowdata.id)
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


<style lang="scss">
@use '../../../node_modules/@vueform/toggle/themes/default.css';
@use '../../styles/colors';

.ListOfExperiencesPage-grid {
    display: grid;
    grid-template-rows: 1fr 1fr;
    min-height: calc(100vh - 91px);
}

.ListOfExperiencesPage-searchSection {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: colors.$lightgray;
    box-shadow: inset 0px -24px 109px rgba(0, 0, 0, 0.1);
}

.ListOfExperiencesPage-searchIcon {
    width: 24px;
    position: absolute;
    right: 12px;
    top: 10px;
    cursor: pointer;
    color: colors.$bluelight;
}

.ListOfExperiencesPage-searchIconBackground {
    width: 40px;
    height: 40px;
    position: absolute;
    right: 5px;
    top: 2.5px;
    background-color: colors.$lightgray;
    border-radius: 50%;
    cursor: pointer;
}

.ListOfExperiences-searchContainer {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 55%;
    margin: 17px;
}

.ListOfExperiences-searchBarInput {
    width: 100%;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
    border-radius: 52px;
}

.ListOfExperiences-buttonContainer {
    margin: 17px;
}

.ListOfExperiencesPage-titleContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 20px;
}

.ListOfExperiencesPage-titleContainer>h2 {
    color: colors.$blue;
    font-weight: 700;
}

.ListOfExperiencesPage-filtersContainer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    margin: 10px;

}

.ListOfExperiencesPage-filtersSection {
    width: 55%;
}

.ListOfExperiencesPage-filtersSection>*,
.ListOfExperiencesPage-filtersContainer>* {
    color: colors.$bluelight;
    font-family: Oswald;
    font-weight: 400;
}

.ListOfExperiencesPage-toggleLabel {
    margin-left: 10px;
}

.ListOfExperiencesPage-radioContainer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.ListOfExperiencesPage-radioContainer>label {
    margin: 10px;
}

.ListOfExperiencesPage-radioContainer>span {
    margin: 10px;
}

.ListOfExperiencesPage-filtersTitle {
    text-transform: uppercase;
    text-decoration: underline;
}

.ListOfExperiencesPage-table {
    width: 90%
}

.ListOfExperiencesPage-listSection {
    display: flex;
    justify-content: center;
    align-items: center;
    }

.vtl-table .vtl-thead .vtl-thead-th {
    font-family: Catamaran;
    font-weight: 700;
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
    color: colors.$bluelight;
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

.vtl-row {
    color: colors.$blue;
    align-items: center;
}

.vtl-paging-page-label {
    margin-left: 5px;
}

.vtl-tbody>.vtl-tbody-tr.ListOfExperiencesPage-tableHover:hover {
    color: colors.$blue;
    cursor: pointer;
}
</style>    