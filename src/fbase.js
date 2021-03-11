import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyBC42chVkeAv0OZaaosfJSxw6cSECqHerU",
    authDomain: "mies-9b170.firebaseapp.com",
    projectId: "mies-9b170",
    storageBucket: "mies-9b170.appspot.com",
    messagingSenderId: "539673967625",
    appId: "1:539673967625:web:8ff5ca38849c7fab108cd8",
    measurementId: "G-T25N9822NR"
};

firebase.initializeApp(firebaseConfig);
export const firebaseInstance = firebase;
export const authService = firebase.auth();
export const dbService = firebase.firestore();