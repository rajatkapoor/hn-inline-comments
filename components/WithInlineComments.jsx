// import { h } from "hastscript";
import React, { useContext } from "react";
import canCreateCommentOnSelection from "../utils/canCreateCommentOnSelection";
import createTempComment from "../utils/createTempComment";
import { CommentsDrawerContext } from "./CommentsDrawer";

// eslint-disable-next-line react/display-name
const WithInlineComments = (node, props, addCommentToCurrentDoc) => {
  const commentDrawerContext = useContext(CommentsDrawerContext);
  const { showCommentButton } = commentDrawerContext;

  const onMouseDown = (e) => {
    //@todo: Add some details somewhere to capture the current node
  };

  const onMouseUp = async (e) => {
    //@todo: Check whether this ends up being in the same node and if commenting is possible
    const commentSpan = document.createElement("span");

    commentSpan.dataset.commentId = "temp";
    commentSpan.style.backgroundColor = "blue";

    if (canCreateCommentOnSelection()) {
      const rect = createTempComment(commentSpan);
      showCommentButton("Add comments", [rect.top - 50, rect.left]);
    }
  };

  const Element = React.createElement(node.tagName, {
    ...props,
    onMouseDown,
    onMouseUp,
  });

  return <>{Element}</>;
};

export default WithInlineComments;
