<template>
    <button class="Button" :class="class">{{label}}</button>
</template>

<script>

export default {

    name: 'Button',


    props: {
        label: {
            type: String,
            required: true,
        }
        ,
        class: String,
    },

}
</script>


<style lang="scss">
@use '../../styles/colors';
@use '../../styles/variables';

.Button {
    display: inline-block;
    padding: 12px 20px;
    font-family: Oswald;
    border: none;
    border-radius: 4px;
    background-color: colors.$blue;
    color: colors.$white;
    cursor: pointer;
    box-shadow: variables.$boxshadow;
    transition: background-color .2s ease-in-out, color .2s;
}

.Button:focus-visible,
.Button:hover {
    background-color: colors.$white;
    color: colors.$blue;
}

.Button--pink {
    background-color: colors.$pink;
} 

.Button--bluelight{
    background-color: colors.$bluelight;
}

.Button--bluelight:focus-visible,
.Button--bluelight:hover {
    background-color: colors.$pink;
    color: colors.$white;
}
</style>