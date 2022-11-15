<template>
    <div class="input-flexContainer">
        <label class="input-label"><span class="pink-asterisk" v-if="isRequired">* </span>{{ label }}</label>
        <multiselect v-model="value" tag-placeholder="Cliquer entrée pour ajouter" selectLabel="Cliquer entrée pour sélectionner" deselectLabel="Cliquer entrée pour dé-sélectionner" placeholder="Chercher ou ajouter"
            label="name" track-by="code" :options="options" :multiple="true" :taggable="true" @tag="addTag"
            @focusout="emit"></multiselect>
    </div>
</template>

<script>

import Multiselect from 'vue-multiselect'

export default {
    name: '',

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
        tagOptions: Array,
        value: [],

    },

    components: {
        Multiselect
    },


    computed: {

    },

    watch: {

    },

    data() {
        return {
            options: this.tagOptions
        }

    },

    methods: {
        addTag(newTag) {
            const tag = {
                name: newTag,
                code: "new" + Math.floor((Math.random() * 10000000))
            }
            this.options.push(tag)
            this.value.push(tag)
        },

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

.multiselect {
    border: solid;
    border-width: 1px;
    border-color: colors.$gray;
    border-radius: 4px;
    margin-bottom: 20px;
}

.multiselect__tag {
    background: colors.$pink;
}
</style>