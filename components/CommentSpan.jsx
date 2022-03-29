import React, { useContext, useRef } from "react";
import { CommentsDrawerContext } from "./CommentsDrawer";

const CommentSpan = ({ addCommentToCurrentDoc, ...props }) => {
  const { "data-comment-thread-id": commentThreadId } = props;
  const commentRef = useRef();
  const commentDrawerContext = useContext(CommentsDrawerContext);
  const { showCommentButton } = commentDrawerContext;

  const handleHover = () => {
    const { top, left } = commentRef.current.getBoundingClientRect();
    showCommentButton(commentThreadId, [top - 50, left], true);
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
