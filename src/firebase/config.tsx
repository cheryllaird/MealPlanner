import firebase from "firebase/app";
import "@firebase/auth"; // eslint-disable-line import/no-extraneous-dependencies
import "@firebase/database"; // eslint-disable-line import/no-extraneous-dependencies
import "@firebase/storage"; // eslint-disable-line import/no-extraneous-dependencies

const firebaseConfig = {
    // apiKey: "AIzaSyAsIDki7e_fARRYmbhUdrj3WsoVAJkGjIk",
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
