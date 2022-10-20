<template>
    <div class="input-flex-container">
        <label class="input-label"><span class="pink-asterisk" v-if="isRequired">* </span> {{label}}  </label>
        <input class="input" type="text" :placeholder="placeholder" v-model="textInput" :required="isRequired"/>
    </div>

</template>

<script>

export default {

    name: 'TextInput',

    props: {
        label: {
            type: String,
            required: true
        },
        placeholder: String,
        isRequired: {
            type: Boolean,
            required: true
        }
    },

    data() {
        return {
            textInput: '',
        }
    }
}
</script>

<style>
@import url('TextInput.css');
</style>