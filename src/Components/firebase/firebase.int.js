
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCj22RruYIAmIUucWEh_TKgIuffAf8PEQw",
  authDomain: "myproject-1c783.firebaseapp.com",
  projectId: "myproject-1c783",
  storageBucket: "myproject-1c783.firebasestorage.app",
  messagingSenderId: "537688691250",
  appId: "1:537688691250:web:35a13487f6ce78eecca22b",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // Firestore
export const githubProvider =  new GithubAuthProvider();


