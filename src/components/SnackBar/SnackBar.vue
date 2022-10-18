<template>

    <div class="SnackBar" :class="snackClass">
        <img :src="snackIcon" />
        <span class="SnackBar-text">{{snackText}}</span>
    </div>

</template>

<script>
export default {
    name: 'SnackBar',

    props: {
        snackText: '',
        snackType: '',
    },



    data() {
        return {
            snackBarpossibleTypes: ['error', 'success', 'info'],
            snackIconPath: { 'error': '../../src/assets/images/error-icon.svg', 'success': '../../src/assets/images/success-icon.svg', 'info': '../../src/assets/images/info-icon.svg' },
            snackClassName: { 'error': 'SnackBar-Error', 'success': 'SnackBar-Success', 'info': 'SnackBar-Info' },
            snackIcon: '',
            snackClass: '',
        }
    },

    mounted() {
        switch (this.snackType) {
            case 'error':
                this.snackIcon = this.snackIconPath.error
                this.snackClass = this.snackClassName.error                
                break;
            case 'success':
                this.snackIcon = this.snackIconPath.success
                this.snackClass = this.snackClassName.success                
                break;
            case 'info':
                this.snackIcon = this.snackIconPath.info
                this.snackClass = this.snackClassName.info                
                break;
        }

    },
}
</script>



<style>
@import url(SnackBar.css);
</style>