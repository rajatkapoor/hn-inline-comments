// import { h } from "hastscript";
import React, { useContext } from "react";
import { useCommentThread } from "../stores/commentThread.store";
import { useSelection } from "../stores/selection.store";
import canCreateCommentThreadOnSelection from "../utils/canCreateCommentThreadOnSelection";
import createTempCommentThread from "../utils/createTempCommentThread";
import { CommentsDrawerContext, MODE } from "./CommentsDrawer";

// eslint-disable-next-line react/display-name
const WithInlineComments = (node, props) => {
  const commentDrawerContext = useContext(CommentsDrawerContext);
  const { showCommentButton } = commentDrawerContext;
  const { updateSelection } = useSelection();
  const { initializeCommentThread } = useCommentThread();

  const onMouseDown = (e) => {
    //@todo: Add some details somewhere to capture the current node
  };

  const onMouseUp = async (e) => {
    //@todo: Check whether this ends up being in the same node and if commenting is possible

    const sel = window.getSelection();
    if (canCreateCommentThreadOnSelection(sel)) {
      updateSelection(sel);
      const range = sel.getRangeAt(0).cloneRange();
      const rect = range.getBoundingClientRect();
      showCommentButton("temp", [rect.top - 50, rect.left], 5000);
      initializeCommentThread("temp");
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
