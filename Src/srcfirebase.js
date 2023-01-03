import firebase from 'firebase/compat'
import { 
  onAuthStateChanged
} from "firebase/compat/auth";  

const firebaseConfig = {
    apiKey: "AIzaSyA2BeQzgoT0-epAgMfeinZq20NMt7ppRq8",
    authDomain: "arduino-cc79f.firebaseapp.com",
    databaseURL: "https://arduino-cc79f-default-rtdb.firebaseio.com",
    projectId: "arduino-cc79f",
    storageBucket: "arduino-cc79f.appspot.com",
    messagingSenderId: "356652080773",
    appId: "1:356652080773:web:79bdbe8d77e36906d993ec"
  };

  if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
    console.log("Connected to firebase")
  }

  const DATA = firebase.database()
  const auth = firebase.auth();

  export {DATA,auth, onAuthStateChanged}