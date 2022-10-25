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



<style lang="scss">
@use '../../styles/colors';
@use '../../styles/variables';

.SnackBar {
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 32px;
    padding: 11px;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 300;
    background-color: colors.$pink;
    color: colors.$white;
    box-shadow: variables.$boxshadow;
}

.SnackBar-text {
    padding-left: 11px;
}

.SnackBar-error{
    background-color: colors.$error;
}

.SnackBar-info{
    background-color: colors.$info;
}

.SnackBar-success {
    background-color: colors.$success;
}
</style>