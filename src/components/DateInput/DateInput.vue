<template>
    <div class="input-flexContainer">
        <label class="input-label"><span class="pink-asterisk" v-if="isRequired">* </span> {{ label }}</label>
        <input type="date" class="input DateInput" v-model="value" :required="isRequired" @blur="emit" />
    </div>
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
@use '../../styles/colors';

.DateInput{
    color:colors.$gray;
}
</style>