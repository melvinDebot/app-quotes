<template>
  <div class="popup" v-if="show ">
    <p>Bonjour pour l’avancement de notre application nous aimerions que vous remplissiez ce formulaire de quelques minutes. </p>
    <div class="popup--buttons">
      <a class="less" @click="displayPopup">Déja fait </a>
      <a class="fill" href="https://forms.gle/1MsbCtgTPEnnwvEa6">Voir le formulaire </a>
    </div>
  </div>
</template>

<script>
export default {
  name : 'PopupQuotes',
  data : function(){
    return {
      show : true
    }
  },
  methods : {
    displayPopup(){
      this.show = false
      console.log('click')
    }
  }
}
</script>
<style lang="scss">
.popup{
  position: absolute;
  z-index: 100;
  width: 92%;
  height: 50%;
  background: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 15px;
  border-radius: 19px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  p{
    text-align: start;
  }
  .popup--buttons{
    width: 100%;
    display: flex;
    justify-content: space-between;
    a {
      width: 128px;
      height: 33px;
      text-align: center;
      font-size: 12px;
      line-height: 33px;
      border-radius: 6px;
    }
    .less{
      color: black;
      border: 1px solid #FFC61B;
    }
    .fill{
      background: #FFC61B;
      color: black;
    }
  }
}
</style>