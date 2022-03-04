// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwixNYOxoqAA_dPsvcPH_AmkW9S5TK92Q",
  authDomain: "justin-messenger.firebaseapp.com",
  projectId: "justin-messenger",
  storageBucket: "justin-messenger.appspot.com",
  messagingSenderId: "837883879372",
  appId: "1:837883879372:web:1ac23dd02e1b4d58c28769"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);