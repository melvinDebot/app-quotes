<template>
  <div class="popup-message" v-if="displayPopup">
    
  </div>
</template>

<script>
export default {
  name: 'Popup',
  props : {
    displayPopup : {
      type : Boolean,
      default : false
    },
    arrayData : {
      type : Object,
      default : () =>  {}
    }
  }

}
</script>

<style lang="scss" scoped>
.popup-message{
  position: absolute;
  width: 100%;
  height: 100vh;
  background: red;
}
</style>