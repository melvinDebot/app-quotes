<template>
  <div class="edit">
    <form @submit="onSubmit">
      <div class="form--verset">
        <label for="fname">Numéro Verset</label>
        <input
          type="text"
          id="fname"
          name="firstname"
          placeholder="Jean 3:10"
          v-model.trim="board.title"
        />
      </div>
      <div class="form--verset">
        <label for="w3review">Verset description</label>
        <textarea
          id="w3review"
          name="w3review"
          rows="7"
          cols="50"
          v-model="board.description"
          placeholder="Quand jésus"
        ></textarea>
      </div>
      <div class="form--verset">
        <label for="w3review">Phrase du jour</label>
        <textarea
          id="w3review"
          name="w3review"
          rows="7"
          cols="50"
          v-model="board.author"
          placeholder="La parole dit"
        >
        </textarea>
      </div>
      <button type="submit">Envoyer</button>
    </form>
  </div>
</template>

<script>
import firebase from "../Firebase";
import router from "../router";

export default {
  name: "AddBoard",
  data() {
    return {
      ref: firebase.firestore().collection("anc-turnips"),
      board: {},
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();

      this.ref
        .add(this.board)
        .then(() => {
          this.board.title = "";
          this.board.description = "";
          this.board.author = "";
          this.board.click = false;
          this.board.counterLike = 0;
          router.push({
            name: "EditQuotes",
          });
        })
        .catch((error) => {
          alert("Error adding document: ", error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.edit {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  form {
    width: 95%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    .form--verset {
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: column;
      margin-top: 15px;
      box-shadow: none;
      label {
        font-weight: 500;
      }
      input[type="text"] {
        width: 100%;
        height: 40px;
        border: 1px solid;
        box-shadow: none;
        font-size: 15px;
        border: 1px solid #ffc61b;
      }
      textarea {
        border: 1px solid;
        box-shadow: none;
        font-size: 16px;
        border: 1px solid #ffc61b;
      }
    }
    button {
      width: 100%;
      height: 40px;
      background-color: lightgreen;
      color: white;
      margin-top: 15px;
      border: none;
      font-size: 20px;
    }
  }
}
</style>
