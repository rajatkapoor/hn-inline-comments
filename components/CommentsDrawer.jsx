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
    resetCommentThread,
    isNewThread,
    isExistingThread,
    createNewCommentThreadWithComment,
    addCommentToCommentThread,
  } = useCommentThread();
  const { selection, updateSelection } = useSelection();
  const { isOpen, onOpen, onClose } = useDisclosure();
  //#region
  const commentDrawerContext = useContext(CommentsDrawerContext);
  if (!commentDrawerContext) {
    throw new Error(
      "CommentsDrawer must be used within a CommentsDrawerProvider"
    );
  }
  const { commentButtonPosition } = commentDrawerContext;
  let buttonText;
  if (isExistingThread()) {
    buttonText = "View Comments";
  } else {
    buttonText = "Add Comments";
  }
  //#endregion

  const handleClose = () => {
    resetCommentThread();
    onClose();
  };

  const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: { text: "" },
    onSubmit: async ({ text: commentText }, { resetForm }) => {
      const { id, comment } = await postComment(commentText);
      if (isExistingThread()) {
        await addCommentToCommentThread(comment);
      } else {
        const newCommentThreadId = await createNewCommentThreadWithComment(
          comment
        );
        addCommentThreadToCurrentDoc(newCommentThreadId);
      }
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
