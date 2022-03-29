// import { h } from "hastscript";
import { Box, Portal } from "@chakra-ui/react";
import React, { useState, useContext } from "react";
import CommentsDrawer, { CommentsDrawerContext } from "./CommentsDrawer";
import canCreateCommentOnSelection from "../utils/canCreateCommentOnSelection";
import createTempComment from "../utils/createTempComment";

// eslint-disable-next-line react/display-name
const WithInlineComments = (node, props, addCommentToCurrentDoc) => {
  const commentDrawerContext = useContext(CommentsDrawerContext);
  const { commentButtonPosition, setCommentButtonPosition } =
    commentDrawerContext;

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
      setCommentButtonPosition([rect.top - 50, rect.left]);
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
