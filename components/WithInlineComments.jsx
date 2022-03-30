// import { h } from "hastscript";
import React from "react";
import { useCommentThread } from "../stores/commentThread.store";
import { useSelection } from "../stores/selection.store";

const WithInlineComments = (node, props) => {
  const { clearSelection, selection } = useSelection();
  const { initializeCommentThread } = useCommentThread();

  const onMouseDown = (e) => {
    clearSelection();
  };

  const onMouseUp = async (e) => {
    if (selection) {
      await initializeCommentThread("temp");
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
