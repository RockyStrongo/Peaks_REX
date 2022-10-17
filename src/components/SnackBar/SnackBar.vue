<template>

    <div class="snackbar">
        <img :src="snackIconPath" />
        <span class="snack-text">{{snackText}}</span>
    </div>

</template>

<script>
import SnackBar from './SnackBar.js';

export default SnackBar;
</script>



<style>
@import url(SnackBar.css);
</style>