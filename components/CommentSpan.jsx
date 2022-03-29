import React, { useContext, useRef } from "react";
import { CommentsDrawerContext, MODE } from "./CommentsDrawer";

const CommentSpan = ({ addCommentToCurrentDoc, ...props }) => {
  const commentRef = useRef();
  const commentDrawerContext = useContext(CommentsDrawerContext);
  const { showCommentButton } = commentDrawerContext;

  const handleHover = () => {
    const { top, left } = commentRef.current.getBoundingClientRect();
    showCommentButton(MODE.VIEW, [top - 50, left], true);
  };

  return (
    <span
      style={{ backgroundColor: "yellow" }}
      {...props}
      onMouseEnter={handleHover}
      ref={commentRef}
    />
  );
};

export default CommentSpan;
