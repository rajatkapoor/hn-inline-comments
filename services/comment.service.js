import { addDoc } from "firebase/firestore";
import { commentsCollection } from "../utils/firebase";

export const createComment = async (comment) => {
  const docSnap = await addDoc(commentsCollection, comment);

  return {
    id: docSnap.id,
    comment: {
      id: docSnap.id,
      ...comment,
    },
  };
};
