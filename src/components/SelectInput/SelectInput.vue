<template>

    <label class="input-label"><span class="pink-asterisk" v-if="isRequired">* </span>{{label}}</label>

    <VueMultiselect 
        class="SelectInput input" 
        placeholder="Choisir" 
        v-model="selected" 
        :options="options" 
        select-label="" 
        selected-label="" 
        deselectLabel="">
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
            selected: null,
            options: this.items
        }
    }

}


</script>

<style src="vue-multiselect/dist/vue-multiselect.css">

</style>


<style>
@import url('SelectInput.css');
</style>