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

    if (canCreateCommentOnSelection()) {
      // const rect = createTempComment(commentSpan);
      const sel = window.getSelection();
      const range = sel.getRangeAt(0).cloneRange();
      const rect = range.getBoundingClientRect();
      showCommentButton("Add comments", [rect.top - 50, rect.left], 5000);
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
