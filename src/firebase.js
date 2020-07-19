import firebase from 'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD8dGcoQfsP-44Ca6Ff411G64WUMaPsUEU",
    authDomain: "fb-crud-9703d.firebaseapp.com",
    databaseURL: "https://fb-crud-9703d.firebaseio.com",
    projectId: "fb-crud-9703d",
    storageBucket: "fb-crud-9703d.appspot.com",
    messagingSenderId: "632364978713",
    appId: "1:632364978713:web:5f8311333c44f3d834d088"
  };
  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);

 export const db = fb.firestore()