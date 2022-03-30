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

Cypress.Commands.add("selection", { prevSubject: true }, (subject, fn) => {
  cy.wrap(subject).trigger("mousedown").then(fn).trigger("mouseup");

  cy.document().trigger("selectionchange");
  return cy.wrap(subject);
});

Cypress.Commands.add(
  "setSelection",
  { prevSubject: true },
  (subject, query, endQuery) => {
    return cy.wrap(subject).selection(($el) => {
      if (typeof query === "string") {
        const anchorNode = getTextNode($el[0], query);
        const focusNode = endQuery ? getTextNode($el[0], endQuery) : anchorNode;
        const anchorOffset = anchorNode.wholeText.indexOf(query);
        const focusOffset = endQuery
          ? focusNode.wholeText.indexOf(endQuery) + endQuery.length
          : anchorOffset + query.length;
        setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset);
      } else if (typeof query === "object") {
        const el = $el[0];
        const anchorNode = getTextNode(el.querySelector(query.anchorQuery));
        const anchorOffset = query.anchorOffset || 0;
        const focusNode = query.focusQuery
          ? getTextNode(el.querySelector(query.focusQuery))
          : anchorNode;
        const focusOffset = query.focusOffset || 0;
        setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset);
      }
    });
  }
);

const getTextNode = (el, match) => {
  const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
  if (!match) {
    return walk.nextNode();
  }

  let node;
  while ((node = walk.nextNode())) {
    if (node.wholeText.includes(match)) {
      return node;
    }
  }
};

const setBaseAndExtent = (...args) => {
  const document = args[0].ownerDocument;
  document.getSelection().removeAllRanges();
  document.getSelection().setBaseAndExtent(...args);
};
