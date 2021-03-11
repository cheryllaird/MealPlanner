import firebase from "firebase/app";
import "@firebase/auth";
import "@firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCE2R4TUFhjSC99hy-MZLlDnSRtjPLFRgo",
    authDomain: "mealplanner-aa27c.firebaseapp.com",
    databaseURL: "https://mealplanner-aa27c-default-rtdb.firebaseio.com/",
    projectId: "mealplanner-aa27c",
    storageBucket: "mealplanner-aa27c.appspot.com",
    messagingSenderId: "515046822098",
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
