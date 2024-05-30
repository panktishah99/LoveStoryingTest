// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from "firebase/app";
// @ts-ignore 
import { initializeAuth, getAuth } from 'firebase/auth';
import { getReactNativePersistence } from '@firebase/auth/dist/rn/index.js';
//import firestore from '@react-native-firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

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

const firebaseApp = initializeApp(firebaseConfig);

// Initialize firestore
const db = getFirestore(firebaseApp);
//const firebaseAuth = getAuth(firebaseApp);
const firebaseAuth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});



export { firebaseApp, firebaseAuth, getApp, getAuth, db };