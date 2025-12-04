// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOPURAPIKEY",
  authDomain: "YOURAUTHDOMAIN",
  projectId: "YOURPROJECTID",
  storageBucket: "YOURSTORAGEBUCKET",
  messagingSenderId: "YOURMESSAGINGSENDERID",
  appId: "YOURAPPID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // Firestore
export const githubProvider = new GithubAuthProvider();
