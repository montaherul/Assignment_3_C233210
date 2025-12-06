// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";

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

// Export Firebase Auth functions for use in AuthContext
export { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  signOut, 
  onAuthStateChanged 
};