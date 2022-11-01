<template>

    <label class="input-label"><span class="pink-asterisk" v-if="isRequired">* </span>{{label}}</label>

    <VueMultiselect 
        class="SelectInput input" 
        placeholder="Choisir" 
        v-model="value" 
        :options="options" 
        select-label="" 
        selected-label="" 
        deselectLabel=""
        @select="emit">
    </VueMultiselect>
</template>

<script>
import VueMultiselect from 'vue-multiselect'

export default {
    name: 'SelectInput',

    components: { VueMultiselect },


    props: {
        label: '',
        isRequired: false,
        items: Array,
        field: String,
    },

    data() {
        return {
            value: '',
            options: this.items
        }
    },

    methods: {
        emit(item){
            const dataobj = {"field": this.field, "value" : item};
            this.emitter.emit(this.field, dataobj);
        }
    },

}


</script>

<style src="vue-multiselect/dist/vue-multiselect.css">

</style>


<style lang="scss">
@use '../../styles/colors';

.input.SelectInput {
    line-height: 1;
    font-family: Oswald;
    padding: initial;
    min-height: 45px;
}

.multiselect__tags {
    display: flex;
    align-items: center;
    min-height: 45px;
    border-radius: 4px;
    font-size: 16px;
    border: none;
    padding: 0 0 0 10px;
}

.multiselect__placeholder{
    margin-bottom: unset;
    padding-top: unset;
    margin-left: 5px;
    color: colors.$gray;
}

.multiselect__select {
    height: 43px;
    padding: unset;
    z-index: 51;
}

.multiselect__single {
    margin-bottom: unset;
}

.multiselect--active > .multiselect__tags > input {
    margin-bottom: unset;
    padding-top: unset;
}

.multiselect__option--highlight{
    background: colors.$pink;
}

.multiselect__option--selected.multiselect__option--highlight{
    background: colors.$pink;
}

</style>