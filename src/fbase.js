import * as firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDGVcmvRSaS64nJPbeZPhV6FER5M3qY_Ew",
    authDomain: "nwitter-e456a.firebaseapp.com",
    databaseURL: "https://nwitter-e456a.firebaseio.com",
    projectId: "nwitter-e456a",
    storageBucket: "nwitter-e456a.appspot.com",
    messagingSenderId: "556931006988",
    appId: "1:556931006988:web:28fce4bb399ec66e41a429"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase
export const authService = firebase.auth()
export const dbService = firebase.firestore()