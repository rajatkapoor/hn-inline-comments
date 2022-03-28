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
