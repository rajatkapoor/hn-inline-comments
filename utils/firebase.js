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

const firebaseTestConfig = {
  apiKey: "AIzaSyBO_aktoHqlnHx7nTrgBu0Y7tGP5bq6E2E",
  authDomain: "hashnode-inline-comments-test.firebaseapp.com",
  projectId: "hashnode-inline-comments-test",
  storageBucket: "hashnode-inline-comments-test.appspot.com",
  messagingSenderId: "634349994471",
  appId: "1:634349994471:web:19419c910f1cffa7b57d42",
};
const finalConfig =
  process.env.NODE_ENV === "test" ? firebaseTestConfig : firebaseConfig;
// Initialize Firebase
export const app = initializeApp(finalConfig);
export const db = getFirestore(app);
export const postsCollection = collection(db, "posts");
export const commentsCollection = collection(db, "comments");
export const commentThreadsCollection = collection(db, "commentThreads");
