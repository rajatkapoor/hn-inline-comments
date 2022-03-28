import { getDoc, doc, updateDoc, getDocs } from "firebase/firestore";
import { db, postsCollection } from "../utils/firebase";

export const getPosts = async () => {
  const querySnapshot = await getDocs(postsCollection);
  const posts = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return posts;
};

export const getPost = async (id) => {
  const docRef = doc(db, "posts", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { ...docSnap.data(), id, err: null };
  } else {
    return { err: new Error("Post not found") };
  }
};

export const updatePost = async (id, content) => {
  const docRef = doc(db, "posts", id);
  await updateDoc(docRef, {
    content,
  });
  return true;
};
