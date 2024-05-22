// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjlPyIbL4fmNy8DraljWFdhoWrE3zD48U",
  authDomain: "lovestoryingapp.firebaseapp.com",
  projectId: "lovestoryingapp",
  storageBucket: "lovestoryingapp.appspot.com",
  messagingSenderId: "432102745233",
  appId: "1:432102745233:web:24ba3714b276b902074b30",
  measurementId: "G-8TWZZFCKC7"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);