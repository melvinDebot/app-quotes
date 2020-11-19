import firebase from 'firebase';


const config = {
  apiKey: "AIzaSyDreag2_rfgyYbj__gMcE3T9HuhnKGhmM8",
  databaseURL: "https://quotes-a52b7.firebaseio.com",
  projectId: "quotes-a52b7",
};
firebase.initializeApp(config);


export default firebase;
