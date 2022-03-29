import React, { useContext, useRef } from "react";
import { useCommentThread } from "../stores/commentThread.store";
import { CommentsDrawerContext } from "./CommentsDrawer";

const CommentSpan = ({ addCommentToCurrentDoc, ...props }) => {
  const { "data-comment-thread-id": commentThreadId } = props;
  const commentRef = useRef();
  const commentDrawerContext = useContext(CommentsDrawerContext);
  const { initializeCommentThread } = useCommentThread();
  const { onOpen } = commentDrawerContext;

  const onClick = async () => {
    initializeCommentThread(commentThreadId);
    onOpen();
  };

  return (
    <span
      style={{ backgroundColor: "yellow" }}
      {...props}
      onClick={onClick}
      ref={commentRef}
    />
  );
};

export default CommentSpan;
