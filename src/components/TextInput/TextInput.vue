<template>
    <div class="input-flex-container">
        <label class="input-label"><span class="pink-asterisk" v-if="isRequired">* </span> {{ label }} </label>
        <input class="input" type="text" :placeholder="placeholder" v-model="textInput" :required="isRequired" />
    </div>

</template>

<script>

export default {

    name: 'TextInput',

    props: {
        label: String,
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

<style lang="scss">
@use '../../styles/colors';

.TextInput {
    height: 45px;
    width: 100%;
    padding: 18px;
    margin-bottom: 20px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    color: colors.$blue;
}

.TextInput-label {
    font-family: Catamaran;
    font-weight: 700;
    font-size: 12px;
    margin-bottom: 5px;
}

.TextInput-flex-container {
    display: flex;
    flex-direction: column;
}

.pink-asterisk {
    color: colors.$pink;
}



</style>