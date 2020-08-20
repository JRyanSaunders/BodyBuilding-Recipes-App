import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyCTxZDX3LDYMzsmISj52p1aRulLswvFA-8",
  authDomain: "rn-bodybuilding-recipes.firebaseapp.com",
  databaseURL: "https://rn-bodybuilding-recipes.firebaseio.com",
  projectId: "rn-bodybuilding-recipes",
  storageBucket: "rn-bodybuilding-recipes.appspot.com",
  messagingSenderId: "935982380650",
  appId: "1:935982380650:web:5265a885b46aa26c74bc13",
  measurementId: "G-09ZXE26J3F",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
