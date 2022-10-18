<template>
    <button class="Button" :class="class">{{label}}</button>
</template>

<script>

export default {

    name: 'Button',


    props: {
        label: '',
        class: '',
    },

}
</script>



<style>
.Button {
    display: inline-block;
    padding: 12px 20px;
    font-family: Oswald;
    border: none;
    border-radius: 4px;
    background-color: #19284A;
    color: #FFF;
    cursor: pointer;
    transition: background-color .2s ease-in-out, color .2s;
}

.Button:focus-visible,
.Button:hover {
    background-color: #FFF;
    color: #19284A;
}

.Button--pink {
    background-color: var(--pink);
}


</style>