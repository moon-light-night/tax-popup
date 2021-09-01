<template>
    <div class="home__wrap" :class="{'home__bg-none': isPopupShowing}">
        <Popup />
    </div>
</template>

<script>
import Popup from '../components/Popup.vue'
export default {
    components: {
        Popup
    },
    computed: {
        isPopupShowing() {
            return this.$store.getters['ISPOPUPSHOWING']
        }
    }
}
</script>