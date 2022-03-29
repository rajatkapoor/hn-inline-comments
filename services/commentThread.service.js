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

export const getCommentThread = async (id) => {
  const docRef = doc(db, "commentThreads", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { commentThread: docSnap.data(), id, err: null };
  } else {
    return {
      commentThread: null,
      id,
      err: new Error("CommentThread not found"),
    };
  }
};
export const getAllCommentsInCommentThred = async (id) => {
  const { commentThread } = await getCommentThread(id);
  const comments = await Promise.all(
    commentThread.comments.map(async (comment) => {
      const id = comment.id;
      const commentDoc = await getDoc(doc(db, "comments", comment.id));
      return { id, ...commentDoc.data() };
    })
  );
  return comments;
};

export const updateCommentThread = async (id, commentThread) => {
  const docRef = doc(db, "commentThreads", id);
  await updateDoc(docRef, commentThread);
  return true;
};

export const addCommentToCommentThread = async (newComment, threadId) => {
  const { commentThread } = await getCommentThread(threadId);

  if (commentThread) {
    const comments = commentThread.comments || [];
    const updatedComments = [...comments, newComment];
    await updateCommentThread(threadId, { comments: updatedComments });
    return true;
  } else {
    return false;
  }
};
