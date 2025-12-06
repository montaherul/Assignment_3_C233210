// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { GoogleAuthProvider, GithubAuthProvider } from "firebase/auth"; // Removed
import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore"; // Removed getFirestore


const firebaseConfig = {
  apiKey: "AIzaSyCj22RruYIAmIUucWEh_TKgIuffAf8PEQw",
  authDomain: "myproject-1c783.firebaseapp.com",
  projectId: "myproject-1c783",
  storageBucket: "myproject-1c783.firebasestorage.app",
  messagingSenderId: "537688691250",
  appId: "1:537688691250:web:35a13487f6ce78eecca22b",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Keep getAuth for potential future use if needed, but it's not used for core auth anymore
// export const db = getFirestore(app); // Firestore is no longer used for orders
// export const githubProvider =  new GithubAuthProvider(); // Removed