// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0LIOJwvM4lYfN5dXhf5fgxkI9dUDxBeo",
  authDomain: "saferouteai-df61f.firebaseapp.com",
  projectId: "saferouteai-df61f",
  storageBucket: "saferouteai-df61f.firebasestorage.app",
  messagingSenderId: "667431055174",
  appId: "1:667431055174:web:51c2ebedd5b5c64f637f47",
  measurementId: "G-SJXRXVB9V1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);