// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIP4hTa1BGMS83BnC9_K5RHbNCW4klQNw",
  authDomain: "aitripplanner-cc028.firebaseapp.com",
  projectId: "aitripplanner-cc028",
  storageBucket: "aitripplanner-cc028.firebasestorage.app",
  messagingSenderId: "1054433183819",
  appId: "1:1054433183819:web:905454b1611a1b3d9da5ce",
  measurementId: "G-FM759E8RJK",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
