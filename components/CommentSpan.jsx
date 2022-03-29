// import { h } from "hastscript";
import { Box, Portal } from "@chakra-ui/react";
import React, { useContext, useRef, useState } from "react";
import CommentsDrawer, { CommentsDrawerContext } from "./CommentsDrawer";

// eslint-disable-next-line react/display-name
const CommentSpan = ({ addCommentToCurrentDoc, ...props }) => {
  const commentRef = useRef();
  const commentDrawerContext = useContext(CommentsDrawerContext);
  const { commentButtonPosition, setCommentButtonPosition } =
    commentDrawerContext;

  let timeoutHandle;
  const handleHover = () => {
    clearTimeout(timeoutHandle);
    const { top, left } = commentRef.current.getBoundingClientRect();
    setCommentButtonPosition([top - 50, left]);
  };
  const handleMouseLeave = () => {
    timeoutHandle = setTimeout(() => {
      setCommentButtonPosition([-1000, -1000]);
    }, 2000);
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

      {/* <Portal>
        <CommentsDrawer
          addCommentToCurrentDoc={addCommentToCurrentDoc}
          buttonText="View Comments"
        />
      </Portal> */}
    </>
  );
};

export default CommentSpan;
