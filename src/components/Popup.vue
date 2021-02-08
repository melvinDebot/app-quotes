<template>
  <div class="popup-message" v-if="displayPopup">
    <h3 @click="closePopup">Back</h3>
  </div>
</template>

<script>
export default {
  name: "Popup",
  props: {
    displayPopup: {
      type: Boolean,
      default: false,
    },
    arrayData: {
      type: Object,
      default: () => {},
    },
    closePopup: {
      type: Function,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
.popup-message {
  position: absolute;
  width: 100%;
  height: 100vh;
  background: red;
  z-index: 100;
}
</style>
