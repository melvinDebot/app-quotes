<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Ajouter
      </h2>
      <b-jumbotron>
        <b-form @submit="onSubmit">
          <b-form-group id="titleGroup"
                    horizontal
                    :label-cols="4"
                    breakpoint="md"
                    label="Verset">
            <b-form-input id="title" v-model.trim="board.title"></b-form-input>
          </b-form-group>
          <b-form-group id="descGroup"
                    horizontal
                    :label-cols="4"
                    breakpoint="md"
                    label="Verset Description">
              <b-form-textarea id="description"
                         v-model="board.description"
                         placeholder="Enter something"
                         :rows="4"
                         :max-rows="6">{{board.description}}
            </b-form-textarea>
          </b-form-group>
          <b-form-group id="authorGroup"
                    horizontal
                    :label-cols="4"
                    breakpoint="md"
                    label="Phrase du jour">
                    <b-form-textarea id="description"
                         v-model="board.author"
                         placeholder="Enter something"
                         :rows="4"
                         :max-rows="6">{{board.author}}
            </b-form-textarea>
            <!-- <b-form-input id="author" v-model.trim="board.author"></b-form-input> -->
          </b-form-group>
          <b-button type="submit" variant="success">Save</b-button>
        </b-form>
      </b-jumbotron>
    </b-col>
  </b-row>
</template>

<script>

import firebase from '../Firebase'
import router from '../router'

export default {
  name: 'AddBoard',
  data () {
    return {
      ref: firebase.firestore().collection('anc-turnips'),
      board: {}
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()

      this.ref.add(this.board).then((docRef) => {
        this.board.title = ''
        this.board.description = ''
        this.board.author = ''
        router.push({
          name: 'EditQuotes'
        })
      })
      .catch((error) => {
        alert("Error adding document: ", error);
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.row{
  height: 100%;
  overflow: hidden;
  .col-12{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    .jumbotron{
      height: 100%;
      margin: 0;
      form{
        padding: 0px 10px;
      }
    }
  }
}
h2{
  text-align: center;
  margin : 0
}
</style>