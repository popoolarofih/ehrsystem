// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCjRso9RQxY9Vcgg_7v-aNV-VF6HMVbIko",
    authDomain: "bookkit-49189.firebaseapp.com",
    databaseURL: "https://bookkit-49189-default-rtdb.firebaseio.com",
    projectId: "bookkit-49189",
    storageBucket: "bookkit-49189.firebasestorage.app",
    messagingSenderId: "241256374457",
    appId: "1:241256374457:web:87c3dec136dcf93a7b7b68",
    measurementId: "G-W22Y8TVQV4"
  };
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };
