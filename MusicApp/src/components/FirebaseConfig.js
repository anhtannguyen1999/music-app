import * as firebase from 'firebase'
var firebaseConfig = {
    apiKey: "AIzaSyDyM3B1OKXy_ynvo-KNJJmrU3jQX4PI2G0",
    authDomain: "musicapp-b6201.firebaseapp.com",
    databaseURL: "https://musicapp-b6201.firebaseio.com",
    projectId: "musicapp-b6201",
    storageBucket: "musicapp-b6201.appspot.com",
    messagingSenderId: "1005619994431",
    appId: "1:1005619994431:web:0e3767951bdb9506b87d8a",
    measurementId: "G-T5E926NH48"
  };
  // Initialize Firebase

  //firebase.analytics();
  
  export const FirebaseApp =  firebase.initializeApp(firebaseConfig);