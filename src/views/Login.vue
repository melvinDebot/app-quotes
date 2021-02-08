<template>
  <div class="login">
    <div class="banner">
      <h2>Se connecter</h2>
    </div>
    <div class="login--input">
      <h4>Email</h4>
      <input type="text" v-model="email" placeholder="Email" />
    </div>
    <div class="login--input">
      <h4>Mot de passe</h4>
      <input type="password" v-model="password" placeholder="Password" />
    </div>
    <button class="login--button" @click="login">
      <h4>Me connecter</h4>
    </button>
    <button class="login--button google" @click="login">
      <h4>Me connecter avec google</h4>
    </button>
    <router-link to="/sign-up">
      <h5>Nouvel Utilisateur ? <span>Sinscrire</span></h5>
    </router-link>

    <!-- 
    <button @click="login">Connection</button>
    <p>
      or Sign In with Google <br />
      <button @click="socialLogin" class="social-button">GOOGLE</button>
    </p>
    <p>
      You don't have an account ? You can
      <router-link to="/sign-up">create one</router-link>
    </p> -->
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          this.$router.replace("home");
        })
        .catch((err) => {
          alert("Oops. " + err.message);
        });
    },
    socialLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          this.$router.replace("home");
        })
        .catch((err) => {
          alert("Oops. " + err.message);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
/* "scoped" attribute limit the CSS to this component only */
.login {
  width: 100%;
  height: 100%;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 0;
  .banner {
    width: 100%;
    height: 113px;
    background: #ffc61b;
    border-radius: 0px 0px 15px 15px;
    position: relative;
    text-align: center;
    padding-top: 50px;
    box-shadow: 0px 10px 0px #fbe193;
    color: white;
  }
  .login--input {
    width: 85%;
    height: 75px;
    &:nth-child(1) {
      margin-top: 40px;
    }
    margin-top: 25px;
    input {
      width: 100%;
      padding: 10px 5px;
      margin-top: 10px;
      
    }
  }
  .login--button {
    width: 70%;
    height: 53px;
    background: #ffc61b;
    border: none;
    color: white;
    text-align: center;
  }
  .google {
    background: #046cf4;
  }
  h5 {
    margin-top: 30px;
    font-weight: 400;
    span {
      font-weight: 600;
      color: #ffc61b;
    }
  }
  a {
    text-decoration: none;
    cursor: pointer;
    color: black;
  }

  button {
    margin-top: 20px;
    width: 10%;
    cursor: pointer;
  }
  p {
    font-size: 13px;

    .social-button {
      width: 75px;
      background: white;
      padding: 10px;
      border-radius: 100%;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
      outline: 0;
      border: 0;
      &:active {
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
      }
      img {
        width: 100%;
      }
    }
  }
}
</style>
