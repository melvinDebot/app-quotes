<template>
  <div id="home">
    <div class="icons">
      <img :src="logoutIcon" alt="" @click="logout" />
      <img :src="accountIcon" alt="" />
    </div>
    <Swipeable
      class="card"
      v-for="(card, index) in boards"
      :key="card.key"
      v-on:swipe="onSwipe"
      @click="clickedCard(index)"
    >
      <p>{{ card.description }}</p>
      <h2>{{ card.title }}</h2>
      <h3>A RETENIR</h3>
      <p>{{ card.author }}</p>
    </Swipeable>
    <Popup :displayPopup="showPopup" />
  </div>
</template>

<script>
import firebase from "../Firebase";
import router from "../router";
import gsap, { Power2 } from "gsap";
import { Swipeable } from "vue-swipy";

import logoutIcon from "../assets/logout.svg";
import accountIcon from "../assets/account.svg";

import Popup from '../components/Popup'

export default {
  name: "QuotesRandom",
  components: {
    Swipeable,
    Popup
  },
  data() {
    return {
      logoutIcon,
      accountIcon,
      fields: [
        { key: "title", label: "Title", sortable: true, class: "text-left" },
        { key: "actions", label: "Action", class: "text-center" },
      ],
      boards: [],
      dataSpin: 0,
      text: "Appuyer",
      myColor: "",
      colors: [
        "#4CACE4",
        "#94EC94",
        "#FC6C64",
        "#E4CCFC",
        "#FCBC94",
        "#FCB847",
        "#F2D4CB",
        "#FCECAC",
        "#94EC94",
        "#F4EC9C",
        "#E4FC84",
        "#B4D4E4",
      ],
      errors: [],
      myQuotes: {},
      ref: firebase.firestore().collection("anc-turnips"),
      showHeart: false,
      numberClicked: [],
      showDiv: false,
      showPopup : false
    };
  },
  created() {
    this.ref.onSnapshot((querySnapshot) => {
      this.boards = [];
      querySnapshot.forEach((doc) => {
        this.boards.push({
          key: doc.id,
          title: doc.data().title,
          description: doc.data().description,
          author: doc.data().author,
          click: doc.data().click,
          counterLike: doc.data().counterLike,
        });
      });
    });
  },
  methods: {
    details(board) {
      router.push({ name: "ShowBoard", params: { id: board.key } });
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("login");
        });
    },
    onSwipe(direction) {
      console.log(direction);
      setTimeout(() => {
        this.boards.pop();
      }, 300);
    },
    clickedCard(index){
      console.log(index)
    },
    // randomQuotes() {
    //   let randomBoard = this.boards[
    //     Math.floor(Math.random() * this.boards.length)
    //   ];
    //   this.myQuotes = randomBoard;

    //   let color = this.colors[Math.floor(Math.random() * this.colors.length)];
    //   this.myColor = color;
    //   (this.text = "À retenir"), (this.showDiv = true);
    //   this.dataSpin += 180;
    //   this.overlayText();
    // },

    show() {
      this.showHeart = this.myQuotes.click;
      this.myQuotes.click = !this.myQuotes.click;
      // this.numberClicked.push(this.newLike)
      setTimeout(() => {
        const userRef = this.ref.doc(this.myQuotes.key);
        const increment = firebase.firestore.FieldValue.increment(1);
        userRef.update({ counterLike: increment });
      }, 1000);
    },
  },
  computed: {
    newLike() {
      return (this.showHeart = this.myQuotes.click);
    },
  },
  mounted() {
    console.log("page refresh");
  },
  destroyed() {},
};
</script>

<style scoped lang="scss">
#home {
  width: 100%;
  height: 100%;
  background: white;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  padding: 0px 37px !important;
  .icons {
    width: 80%;
    height: 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: flex-start;
    position: absolute;
    top: 15px;
  }
  .card {
    z-index: 99;
    position: absolute;
    width: 80%;
    height: 76%;
    border-radius: 8px;
    background: #ffc61b;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
    flex-direction: column;
    padding: 10px 10px;
    h2 {
      margin: 10px 0px;
      color: #ffffff;
    }
  }

  h6 {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 10px;
    opacity: 0.3;
  }
  .banner--install {
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
    z-index: 100;
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
    .box--text {
      h3 {
        font-size: 4.9vw;
        margin-bottom: 10px;
        @media (min-width: 600px) {
          font-size: 2vw;
        }
      }
      h4 {
        text-align: start;
        font-size: 4vw;
        margin-bottom: 10px;
        @media (min-width: 600px) {
          font-size: 2vw;
        }
      }
    }
  }
}

p {
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
  span {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}

.quote--right {
  width: 90px;
  height: 90px;
  position: absolute;
  bottom: 0;
  right: 0;
  opacity: 0.4;
}
.quote--left {
  width: 90px;
  height: 90px;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.4;
}
.heart {
  margin-bottom: 10px;
  fill: none;
  stroke: white;
}
.active {
  fill: white;
  stroke: white;
}
.count {
  width: 200px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h4 {
    margin-left: 10px;
    font-size: 13px;
  }
}
</style>
