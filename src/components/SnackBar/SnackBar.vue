<template>

    <div class="SnackBar" :class="`SnackBar-${snackType}`">
        <img :src="snackIcon" />
        <span class="SnackBar-text">{{snackText}}</span>
    </div>

</template>

<script>
export default {
    name: 'SnackBar',

    props: {
        snackText: {
            type: String,
            required: true,
        },
        snackType: {
            type: String,
            required: true,
        },
    },

    computed: {
        snackIcon() {
            switch (this.snackType) {
                case 'error':
                    return this.snackIconPath.error
                case 'success':
                    return this.snackIconPath.success
                default:
                    return this.snackIconPath.info
            }
        },

    },

    data() {
        return {
            snackBarpossibleTypes: ['error', 'success', 'info'],
            snackIconPath: { 'error': '../../src/assets/images/error-icon.svg', 'success': '../../src/assets/images/success-icon.svg', 'info': '../../src/assets/images/info-icon.svg' },
            snackClassName: { 'error': 'SnackBar-Error', 'success': 'SnackBar-Success', 'info': 'SnackBar-Info' },
        }
    },

}
</script>



<style>
@import url(SnackBar.css);
</style>