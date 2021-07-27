import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyAiSiLJY6xqBW5zgi-vooWky6ovTY2FDzw",
    authDomain: "madcamp4-36c17.firebaseapp.com",
    projectId: "madcamp4-36c17",
    storageBucket: "madcamp4-36c17.appspot.com",
    messagingSenderId: "130884957139",
    appId: "1:130884957139:web:757093d700f3958d02b526",
    measurementId: "G-ECXFY2DLT3"
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const authService = firebase.auth();
export const dbService = firebase.firestore();