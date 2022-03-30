import { collection, query, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";

const dropCollection = async (collectionName) => {
  const q = query(collection(db, collectionName));
  const querySnapshot = await getDocs(q);

  const deleteOps = [];

  querySnapshot.forEach((doc) => {
    deleteOps.push(deleteDoc(doc.ref));
  });

  Promise.all(deleteOps).then(() => console.log("documents deleted"));
};

Cypress.Commands.add("clearFirebase", async () => {
  await dropCollection("posts");
  await dropCollection("comments");
  await dropCollection("commentThreads");
});
