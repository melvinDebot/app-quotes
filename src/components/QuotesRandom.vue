<template>
  <div id="home" :style="{ 'background':  myColor}">
    <!-- <PopupQuotes /> -->
    <h6>Développer par Melvin Dbt</h6>
      <div class="box">
        <div class="box--text">
        <h4>{{ myQuotes.description }}</h4> 
        <h3>{{ myQuotes.title }}</h3> 
      </div>
      <div>
      <h2>{{ text }}</h2>
      <p>
        {{ myQuotes.author }}
        <span class="sentence" :style="{ 'background':  myColor}"></span>
      </p>
    </div>
    <div class="quote--right">
      <svg width="93" height="73" viewBox="0 0 93 73" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M92.4837 49.8705C92.4837 39.8275 90.6687 33.8985 84.7396 24.279C78.6291 14.478 66.6501 4.85854 57.9381 0.381531L55.1551 5.76604C62.6571 11.09 67.4971 15.2645 72.8211 25.489C74.3337 28.393 75.1806 30.934 75.6646 33.233C74.5151 32.991 73.2446 32.87 71.9741 32.87C60.9631 32.87 52.0696 41.824 52.0696 52.835C52.0696 63.846 60.9631 72.8 71.9741 72.8C81.1096 72.8 88.8536 66.629 91.1526 58.159C91.9996 55.739 92.4837 53.0165 92.4837 49.8705Z" fill="white"/>
      <path d="M40.514 49.8705C40.514 39.8275 38.699 33.8985 32.77 24.279C26.6595 14.478 14.6805 4.85854 5.96851 0.381531L3.18551 5.76604C10.6875 11.09 15.5275 15.2645 20.8515 25.489C22.364 28.393 23.211 30.934 23.695 33.233C22.5455 32.991 21.275 32.87 20.0045 32.87C8.99351 32.87 0.100006 41.824 0.100006 52.835C0.100006 63.846 8.99351 72.8 20.0045 72.8C29.14 72.8 36.884 66.629 39.183 58.159C40.03 55.739 40.514 53.0165 40.514 49.8705Z" fill="white"/>
      </svg>
    </div>
    <div class="quote--left">
      <svg width="93" height="73" viewBox="0 0 93 73" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 49.489C0 39.4459 1.81501 33.5169 7.74401 23.8974C13.8545 14.0964 25.8335 4.47694 34.5455 -6.10352e-05L37.3285 5.38445C29.8265 10.7084 24.9865 14.8829 19.6625 25.1074C18.15 28.0115 17.303 30.5524 16.819 32.8514C17.9685 32.6095 19.239 32.4884 20.5095 32.4884C31.5205 32.4884 40.414 41.4424 40.414 52.4535C40.414 63.4645 31.5205 72.4185 20.5095 72.4185C11.374 72.4185 3.63001 66.2475 1.33101 57.7775C0.484009 55.3575 0 52.635 0 49.489Z" fill="white"/>
      <path d="M51.9697 49.489C51.9697 39.4459 53.7847 33.5169 59.7137 23.8974C65.8242 14.0964 77.8032 4.47694 86.5152 -6.10352e-05L89.2982 5.38445C81.7962 10.7084 76.9562 14.8829 71.6322 25.1074C70.1197 28.0115 69.2727 30.5524 68.7887 32.8514C69.9382 32.6095 71.2087 32.4884 72.4792 32.4884C83.4902 32.4884 92.3837 41.4424 92.3837 52.4535C92.3837 63.4645 83.4902 72.4185 72.4792 72.4185C63.3437 72.4185 55.5997 66.2475 53.3007 57.7775C52.4537 55.3575 51.9697 52.635 51.9697 49.489Z" fill="white"/>
      </svg>
    </div>
      </div>
      <div class="count" v-if="showDiv">
        <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg" class="heart" :class="{active : newLike}" @click="show">
        <path d="M18.4994 32.4584C-12.3333 15.4166 9.24998 -3.08336 18.4994 8.61489C27.75 -3.08336 49.3333 15.4166 18.4994 32.4584Z" stroke-opacity="0.92" stroke-width="1.8"/>
        </svg>
        <h4 v-if="myQuotes.counterLike <= 1">
          {{ myQuotes.counterLike }} personne aime ce verset.
        </h4>
        <h4 v-if="myQuotes.counterLike > 1">
          {{ myQuotes.counterLike }} personnes aiment ce verset
        </h4>
      </div>
      
      <div @click="randomQuotes" class="button--rotate" :style="{transform: 'rotate(' + this.dataSpin + 'deg)'}">
      <img :src="refresh" alt="refresh"/>
    </div>
  </div>
</template>

<script>

import firebase from '../Firebase'
import router from '../router'
import refresh from '@/assets/refresh.png'
import gsap, {Power2} from 'gsap'
import PopupQuotes from './PopupQuotes'

export default {
  name: 'QuotesRandom',
  components : {
    PopupQuotes
  },
  data () {
    return {
      fields: [
        { key: 'title', label: 'Title', sortable: true, 'class': 'text-left' },
        { key: 'actions', label: 'Action', 'class': 'text-center' }
      ],
      boards: [],
      refresh : refresh,
      dataSpin : 0,
      text: "Appuyer",
      myColor: "",
      colors: ['#4CACE4', '#94EC94', '#FC6C64', '#E4CCFC', '#FCBC94', '#FCB847', '#F2D4CB', '#FCECAC', "#94EC94", "#F4EC9C", "#E4FC84", "#B4D4E4"],
      errors: [],
      myQuotes : {},
      ref: firebase.firestore().collection('anc-turnips'),
      showHeart : false,
      numberClicked : [],
      showDiv : false
    }
  },
  created () {
    this.ref.onSnapshot((querySnapshot) => {
      this.boards = [];
      querySnapshot.forEach((doc) => {
        this.boards.push({
          key: doc.id,
          title: doc.data().title,
          description: doc.data().description,
          author : doc.data().author,
          click : doc.data().click,
          counterLike : doc.data().counterLike
        });
      });
      
    });
  },
  methods: {
    details (board) {
      router.push({ name: 'ShowBoard', params: { id: board.key }})
    },
    randomQuotes(){
      let randomBoard = this.boards[Math.floor(Math.random()*this.boards.length)]
      this.myQuotes = randomBoard

      let color = this.colors[Math.floor(Math.random()*this.colors.length)]
      this.myColor = color
      this.text = "À retenir",
      this.showDiv = true
      this.dataSpin += 180
      this.overlayText()
    },
    overlayText(){
      let texte = document.querySelector('.sentence')
      gsap.fromTo(texte, 1, 
        {
          width: "100%",
          ease: Power2.easeInOut
        },
        {
          width: "0%",
          ease: Power2.easeInOut
        },
      )
    },
    show(){
      this.showHeart = this.myQuotes.click
      this.myQuotes.click = !this.myQuotes.click
      // this.numberClicked.push(this.newLike)
      setTimeout(() => {
        const userRef = this.ref.doc(this.myQuotes.key)
        const increment = firebase.firestore.FieldValue.increment(1)
        userRef.update({ counterLike: increment });
      }, 1000)
      // this.saveCats();
    },
    // saveCats() {
    //   let parsed = JSON.stringify(this.numberClicked);
    //   localStorage.setItem('cats', parsed);
    // }
  },
  computed : {
    newLike(){
      return this.showHeart = this.myQuotes.click
    }
  },
  mounted(){
    // if(localStorage.count) this.numberClicked = localStorage.count;
    // if(localStorage.getItem('cats')) {
    //   try {
    //     this.numberClicked = JSON.parse(localStorage.getItem('cats'));
    //   } catch(e) {
    //     localStorage.removeItem('cats');
    //   }
    // }
    
  },
  // watch:{
  //   count(newCount) {
  //     localStorage.count = newCount;
  //   }
  // }

}
</script>

<style scoped lang="scss">
  #home {
    width: 100%;
    height: 100%;
    background: #FFC61B;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow: hidden;

    h6{
      position: absolute;
      top: 10px;
      left: 10px;
      font-size: 10px;
      opacity: 0.30;
    }
    .banner--install{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      width: 40%;
      height: 30%;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 100
    }
    .box {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      width: 85%;
      height: auto;
      padding: 3px;
      margin-bottom: 20px;
      .box--text{
        h3{
        font-size: 4.9vw;
        margin-bottom: 10px;
        @media (min-width: 600px) {
        font-size: 2vw;
      }
    }
    h4{
      text-align : start;
      font-size: 4vw;
      margin-bottom: 10px;
      @media (min-width: 600px) {
        font-size: 2vw;
      }
    }
  }
}
  }
  .button--rotate {
    width: 71px;
    height: 71px;
    border-radius: 50%;
    background: white;
    padding: 18px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    transition: all, 1s;
  }
  p{
    text-align: start;
    font-size: 4.5vw;
      color: black;
      text-align: start;
      width: auto;
      height: auto;
      position: relative;
      @media (min-width: 600px) {
        font-size: 2vw;
      }
    span{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    }
    
  }
  

  .quote--right{
    width: 90px;
    height: 90px;
    position: absolute;
    bottom: 0;
    right: 0;
    opacity: 0.40;
  }
  .quote--left{
    width: 90px;
    height: 90px;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.40;
  }
  .heart{
    margin-bottom: 10px;
    fill : none;
    stroke: white
  }
  .active {
    fill : white;
    stroke: white
  }
  .count{
    width: 200px;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h4{
      margin-left: 10px;
      font-size: 13px;
    }
  }
</style>
