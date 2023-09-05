// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbcmRci7domXvDcVWNnR7KJjgFLxehQYg",
  authDomain: "gif-market.firebaseapp.com",
  projectId: "gif-market",
  storageBucket: "gif-market.appspot.com",
  messagingSenderId: "557926813869",
  appId: "1:557926813869:web:a6e6b67d76f46540fc7624",
  measurementId: "G-5Y631XTZE8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth= getAuth()