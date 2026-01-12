import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Added this

const firebaseConfig = {
  apiKey: "AIzaSyAxm82-peO-DiiVgSC9Wz94YuMInTnhq-M",
  authDomain: "brute-b55d9.firebaseapp.com",
  projectId: "brute-b55d9",
  storageBucket: "brute-b55d9.firebasestorage.app",
  messagingSenderId: "416799718740",
  appId: "1:416799718740:web:6ca60beeead1784d75dcc1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);