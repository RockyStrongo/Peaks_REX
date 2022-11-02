<template>
    <div class="input-flexContainer">
        <label class="input-label"><span class="pink-asterisk" v-if="isRequired">* </span> {{ label }} </label>
        <input class="input" type="text" :placeholder="placeholder" v-model="textInput" :required="isRequired" @keyup="emit"/>
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
        },
        field : String,
    },

    data() {
        return {
            textInput: '',
        }
    },

    methods : {
        emit(){
            const dataobj = {"field": this.field, "value" : this.textInput};
            this.emitter.emit(this.field, dataobj);
        }
    }
}
</script>

<style lang="scss">
    
</style>