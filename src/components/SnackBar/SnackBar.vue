<template>

    <div class="snackbar">
        <img :src="snackIconPath" />
        <span class="snack-text">{{snackText}}</span>
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