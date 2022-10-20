<template>
    <label class="input-label"><span class="pink-asterisk" v-if="isRequired">* </span>{{label}}</label>
    <select :required="isRequired" class="SelectInput input ">
        <option value=""></option>
        <option v-for="item in items" :value="item">{{item}}</option>
    </select>
</template>

<script>

export default {
    name: 'SelectInput',

    props: {
        label: {
            type: String,
            required: true
        },
        isRequired: {
            type: Boolean,
            required: true
        },
        items: {
            type: Array,
            required: true
        }
    },

}


</script>

<style>
@import url('SelectInput.css');
</style>