import React, { useContext, useRef } from "react";
import { useCommentThread } from "../stores/commentThread.store";
import { CommentsDrawerContext } from "./CommentsDrawer";

const CommentSpan = ({ addCommentToCurrentDoc, ...props }) => {
  const { "data-comment-thread-id": commentThreadId } = props;
  const commentRef = useRef();
  const commentDrawerContext = useContext(CommentsDrawerContext);
  const { initializeCommentThread } = useCommentThread();
  const { showCommentButton } = commentDrawerContext;

  const handleHover = () => {
    const { top, left } = commentRef.current.getBoundingClientRect();
    showCommentButton([top - 50, left], true);
    initializeCommentThread(commentThreadId);
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
