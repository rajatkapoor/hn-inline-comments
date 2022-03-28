// import { h } from "hastscript";
import { Box, Portal } from "@chakra-ui/react";
import React, { useState } from "react";
import CommentsDrawer from "./CommentsDrawer";

// eslint-disable-next-line react/display-name
const WithInlineComments = (node, props, addCommentToCurrentDoc) => {
  const [addCommentBoxPosition, setAddCommentBoxPosition] = useState([
    -1000, -1000,
  ]);

  const onMouseDown = (e) => {
    //@todo: Add some details somewhere to capture the current node
  };

  const onMouseUp = async (e) => {
    //@todo: Check whether this ends up being in the same node and if commenting is possible
    const commentSpan = document.createElement("span");

    commentSpan.dataset.commentId = "temp";
    commentSpan.style.backgroundColor = "blue";

    const sel = window.getSelection();
    const { anchorOffset, focusOffset } = sel;
    if (sel.rangeCount && anchorOffset !== focusOffset) {
      const range = sel.getRangeAt(0).cloneRange();
      const rect = range.getBoundingClientRect();
      setAddCommentBoxPosition([rect.top - 50, rect.left]);

      range.surroundContents(commentSpan);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  };

  const Element = React.createElement(node.tagName, {
    ...props,
    onMouseDown,
    onMouseUp,
  });

  return (
    <>
      {Element}

      <Portal>
        <Box
          position={"absolute"}
          top={addCommentBoxPosition[0]}
          left={addCommentBoxPosition[1]}
        >
          <CommentsDrawer addCommentToCurrentDoc={addCommentToCurrentDoc} />
        </Box>
      </Portal>
    </>
  );
};

export default WithInlineComments;
