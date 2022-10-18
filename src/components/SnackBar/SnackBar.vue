<template>

    <div class="SnackBar">
        <img :src="snackIconPath" />
        <span class="SnackBar-text">{{snackText}}</span>
    </div>

</template>

<script>
export default {
    name: 'SnackBar',

    props: {
        snackText: '',
        snackColor: '',
        snackIconPath: '',
    },

}
</script>



<style>
@import url(SnackBar.css);
</style>