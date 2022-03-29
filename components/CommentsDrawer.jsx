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
import React, { createContext, useContext } from "react";
import { postComment } from "../services/comment.service";
import { useCommentThread } from "../stores/commentThread.store";
import { useSelection } from "../stores/selection.store";
import canCreateCommentThreadOnSelection from "../utils/canCreateCommentThreadOnSelection";
import createTempCommentThread from "../utils/createTempCommentThread";
import CommentInput from "./CommentInput";
import CommentThread from "./CommentThread";
export const CommentsDrawerContext = createContext();

export const CommentsDrawerProvider = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <CommentsDrawerContext.Provider
      value={{
        isOpen,
        onOpen,
        onClose,
      }}
    >
      {children}
    </CommentsDrawerContext.Provider>
  );
};

const CommentsDrawer = ({ addCommentThreadToCurrentDoc }) => {
  const {
    comments,
    resetCommentThread,
    isNewThread,
    isExistingThread,
    createNewCommentThreadWithComment,
    addCommentToCommentThread,
  } = useCommentThread();
  const { selection, updateSelection, getSelectionPosition } = useSelection();
  const commentDrawerContext = useContext(CommentsDrawerContext);
  const { isOpen, onClose, onOpen } = commentDrawerContext;
  const position = getSelectionPosition();

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
      top={position[0]}
      left={position[1]}
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
        Add comments
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
