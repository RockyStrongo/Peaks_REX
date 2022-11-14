<template>
    <div class="input-flexContainer">
        <label class="input-label"><span class="pink-asterisk" v-if="isRequired">* </span> {{ label }} </label>
        <textarea class="TextAreaInput" :placeholder="placeholder" v-model="value" :required="isRequired"
            @keyup="emit"> </textarea>
    </div>

</template>

<script>

export default {

    name: 'TextAreaInput',

    props: {
        label: String,
        placeholder: String,
        isRequired: {
            type: Boolean,
            required: true
        },
        field: String,
        value: {
            type: String,
            default: "",
            required: false,
        },
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
    }
}
</script>

<style lang="scss">
@use '../../styles/colors';

.TextAreaInput {
    height: 100px;
    width: 100%;
    padding: 18px;
    margin-bottom: 20px;
    border: solid;
    border-width: 1px;
    border-color: colors.$gray;
    border-radius: 4px;
    font-size: 16px;
    font-family: Oswald;
    color: colors.$blue;

}
</style>