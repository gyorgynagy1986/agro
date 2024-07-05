// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; // Import Firebase Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDrWaI5qeejcV3eQ_vHyHTX1oX9qxUtc0",
  authDomain: "agro-b126f.firebaseapp.com",
  projectId: "agro-b126f",
  storageBucket: "agro-b126f.appspot.com",
  messagingSenderId: "1034542864411",
  appId: "1:1034542864411:web:48a73076327265de6f40be",
  measurementId: "G-BJDRCG25EN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app); // Initialize Firebase Storage

export { app, db, auth, storage }; // Export storage


