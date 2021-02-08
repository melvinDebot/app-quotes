<template>
  <div class="sign-up">
  <div class="banner">
    <h2>Se connecter</h2>
  </div>
  <div class="sign-up--input">
    <h4>Nom utilisateur</h4>
    <input type="text" v-model="email" placeholder="nom" />
  </div>
  <div class="sign-up--input">
    <h4>Email</h4>
    <input type="email" v-model="email" placeholder="Email" />
  </div>
  <div class="sign-up--input">
    <h4>Password</h4>
    <input type="password" v-model="password" placeholder="Password" />
  </div>
  <div class="sign-up--input">
    <h4>Confirmer votre mot de passe</h4>
    <input type="password" v-model="password" placeholder="Password" />
  </div>
  <button class="sign-up--button" @click="signUp">
    <h4>Me connecter</h4>
  </button>
  <router-link to="/login">
    <h5>Revenir à la page login</h5>
  </router-link>
    <!-- 
    <input type="text" v-model="email" placeholder="Email" /><br />
    <br />
    <button @click="signUp">Sign Up</button>
    <span>or go back to <router-link to="/login">login</router-link>.</span> -->
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "signUp",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    signUp: function () {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          (user) => {
            this.$router.replace("home");
          },
          (err) => {
            alert("Oops. " + err.message);
          }
        );
    },
  },
};
</script>

<style lang="scss" scoped>
.sign-up {
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
  .sign-up--input{
    width: 85%;
    height: 75px;
    margin-top: 25px;
    input {
      width: 100%;
      padding: 10px 5px;
      margin-top: 10px;
      -webkit-box-shadow: none
    }
  }
  .sign-up--button{
    width: 70%;
    height: 53px;
    background: #ffc61b;
    border: none;
    color: white;
    text-align: center;
    margin-top: 10px;
  }
  h5 {
    margin-top: 20px;
    font-weight: 400;
    color: #ffc61b;
  }
  a {
    text-decoration: none;
    cursor: pointer;
    color: black;
  }
}
</style>
