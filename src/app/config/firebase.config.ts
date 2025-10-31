import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDZRonq2NxeWd6n7cqaeGCkR99LI7m2Ms",
  authDomain: "dndb-3be80.firebaseapp.com",
  projectId: "dndb-3be80",
  storageBucket: "dndb-3be80.firebasestorage.app",
  messagingSenderId: "828187979685",
  appId: "1:828187979685:web:592cc71647619054f9824c",
  measurementId: "G-CZNCLPTZ9V"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Analytics (only in browser environment)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

