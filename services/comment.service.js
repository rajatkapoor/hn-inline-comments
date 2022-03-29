import {
  getDoc,
  doc,
  updateDoc,
  getDocs,
  setDoc,
  addDoc,
} from "firebase/firestore";
import { db, commentsCollection } from "../utils/firebase";

export const postComment = async (text) => {
  const docSnap = await addDoc(commentsCollection, {
    text,
  });

  return {
    id: docSnap.id,
    comment: {
      id: docSnap.id,
      text,
    },
  };
};
