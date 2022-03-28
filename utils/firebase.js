// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPAIUg0znX2mZLdO6cC_rqgHu8Hhqw2vk",
  authDomain: "hashnode-inline-comments.firebaseapp.com",
  projectId: "hashnode-inline-comments",
  storageBucket: "hashnode-inline-comments.appspot.com",
  messagingSenderId: "150064763336",
  appId: "1:150064763336:web:7246f8320c71d1002630fd",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const postsCollection = collection(db, "posts");
export const commentsCollection = collection(db, "comments");
