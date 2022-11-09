<template>
    <label class=""><span class="pink-asterisk" v-if="isRequired">* </span> {{ label }}</label>
    <input type="date" v-model="value" :required="isRequired" @blur="emit" />
</template>

<script>

export default {
    name: 'DateInput',

    props: {
        label: {
            type: String,
            required: true,
        },
        isRequired: {
            type: Boolean,
            required: true,
        },
        field: String,
        value: {
            type: String,
            default: "",
            required: false,
        },
    },

    components: {

    },


    computed: {

    },

    watch: {

    },

    data() {
        return {

        }

    },

    methods: {
        emit() {
            const dataobj = { "field": this.field, "value": this.value };
            this.emitter.emit(this.field, dataobj);
        }

    },
    mounted() {

    }
}


</script>

<style lang="scss">

</style>