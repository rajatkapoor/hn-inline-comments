import {
  getDoc,
  doc,
  updateDoc,
  getDocs,
  setDoc,
  addDoc,
} from "firebase/firestore";
import { db, commentThreadsCollection } from "../utils/firebase";

export const createCommentThread = async (data) => {
  const docSnap = await addDoc(commentThreadsCollection, data);

  return docSnap.id;
};

export const addCommentToCommentThread = async (commentId, threadId) => {
  const docSnap = await updateDoc(commentThreadsCollection, threadId, {
    comments: [
      ...(await getDoc(commentThreadsCollection, threadId).comments),
      commentId,
    ],
  });

  return docSnap.id;
};
