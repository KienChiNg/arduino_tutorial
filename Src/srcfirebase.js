import firebase from 'firebase/compat'
import { 
  onAuthStateChanged
} from "firebase/compat/auth";  

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };

  if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
    console.log("Connected to firebase")
  }

  const DATA = firebase.database()
  const auth = firebase.auth();

  export {DATA,auth, onAuthStateChanged}
