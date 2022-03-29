import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { createContext, useContext, useRef, useState } from "react";
import { postComment } from "../services/comment.service";
import {
  addCommentToCommentThread,
  createCommentThread,
} from "../services/commentThread.service";
import { useCommentThread } from "../stores/commentThread.store";
import { useSelection } from "../stores/selection.store";
import canCreateCommentThreadOnSelection from "../utils/canCreateCommentThreadOnSelection";
import createTempCommentThread from "../utils/createTempCommentThread";
import CommentInput from "./CommentInput";
import CommentThread from "./CommentThread";
export const CommentsDrawerContext = createContext();

export const CommentsDrawerProvider = ({ children }) => {
  const hiddenPosition = [-1000, 1000];
  const [commentButtonPosition, setCommentButtonPosition] =
    useState(hiddenPosition);

  let timeoutHandle = useRef(null);
  const showCommentButton = ([top, right], autoHide = false) => {
    clearTimeout(timeoutHandle.current);
    setCommentButtonPosition([top, right]);
    if (autoHide) {
      timeoutHandle.current = setTimeout(() => {
        hideCommentButton();
      }, 2000);
    }
  };
  const hideCommentButton = () => {
    setCommentButtonPosition(hiddenPosition);
  };

  return (
    <CommentsDrawerContext.Provider
      value={{
        commentButtonPosition,
        showCommentButton,
        hideCommentButton,
      }}
    >
      {children}
    </CommentsDrawerContext.Provider>
  );
};

const CommentsDrawer = ({ addCommentThreadToCurrentDoc }) => {
  const {
    id,
    comments,
    initializeCommentThread,
    resetCommentThread,
    isNewThread,
    isExistingThread,
  } = useCommentThread();
  const { selection, updateSelection } = useSelection();

  const commentDrawerContext = useContext(CommentsDrawerContext);
  if (!commentDrawerContext) {
    throw new Error(
      "CommentsDrawer must be used within a CommentsDrawerProvider"
    );
  }
  const { commentButtonPosition } = commentDrawerContext;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleClose = () => {
    resetCommentThread();
    onClose();
  };

  let buttonText;
  if (isExistingThread()) {
    buttonText = "View Comments";
  } else {
    buttonText = "Add Comments";
  }
  const { values, handleChange, handleSubmit, setFieldValue, resetForm } =
    useFormik({
      initialValues: { text: "" },
      onSubmit: async (values) => {
        const newComment = await postComment(values.text);
        if (isNewThread()) {
          //create comment thread
          const newCommentThreadId = await createCommentThread({
            comments: [newComment],
          });

          const success = await addCommentThreadToCurrentDoc(
            newCommentThreadId
          );
          initializeCommentThread(newCommentThreadId);
        } else {
          // view mode
          // add comment to thread
          const success = await addCommentToCommentThread(newComment, id);
        }

        resetForm();
        // also notify user that the comment was added
        handleClose();
      },
    });

  return (
    <Box
      position={"absolute"}
      top={commentButtonPosition[0]}
      left={commentButtonPosition[1]}
      zIndex={100}
    >
      <Button
        onClick={() => {
          if (isNewThread() && canCreateCommentThreadOnSelection(selection)) {
            createTempCommentThread(selection);
            updateSelection(null);
          } else {
          }
          onOpen();
        }}
        pos="relative"
      >
        {buttonText}
      </Button>
      <Drawer isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton onClick={handleClose} />
          <DrawerHeader>Add a comment</DrawerHeader>

          <DrawerBody>
            <CommentThread comments={comments} />
            <CommentInput
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              defaultValue={values.text}
            />
          </DrawerBody>

          <DrawerFooter>
            <Button type="submit" form="my-form">
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
export default CommentsDrawer;
