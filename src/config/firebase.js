// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"; 
const firebaseConfig = {
  apiKey: "AIzaSyB9uKSqD-BXzgRMM272ttAl71zrc__5t30",
  authDomain: "login-96050.firebaseapp.com",
  projectId: "login-96050",
  storageBucket: "login-96050.appspot.com",
  messagingSenderId: "414833914171",
  appId: "1:414833914171:web:e77ef31e8d4b33d2b7071e",
  measurementId: "G-RNCJ7JPPPQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=  getAuth(app)