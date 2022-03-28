// import { h } from "hastscript";
import { Box, Portal } from "@chakra-ui/react";
import React, { useState, useRef } from "react";
import CommentsDrawer from "./CommentsDrawer";

// eslint-disable-next-line react/display-name
const CommentSpan = ({ addCommentToCurrentDoc, ...props }) => {
  const commentRef = useRef();
  const [addCommentBoxPosition, setAddCommentBoxPosition] = useState([
    -1000, -1000,
  ]);

  let timeoutHandle;
  const handleHover = () => {
    clearTimeout(timeoutHandle);
    const { top, left } = commentRef.current.getBoundingClientRect();
    setAddCommentBoxPosition([top - 50, left]);
  };
  const handleMouseLeave = () => {
    timeoutHandle = setTimeout(() => {
      setAddCommentBoxPosition([-1000, -1000]);
    }, 500);
  };

  return (
    <>
      <span
        style={{ backgroundColor: "yellow" }}
        {...props}
        onMouseOver={handleHover}
        onMouseLeave={handleMouseLeave}
        ref={commentRef}
      />

      <Portal>
        <Box
          position={"absolute"}
          top={addCommentBoxPosition[0]}
          left={addCommentBoxPosition[1]}
          zIndex={100}
          onMouseOver={handleHover}
          onMouseLeave={handleMouseLeave}
        >
          <CommentsDrawer
            addCommentToCurrentDoc={addCommentToCurrentDoc}
            buttonText="View Comments"
          />
        </Box>
      </Portal>
    </>
  );
};

export default CommentSpan;
