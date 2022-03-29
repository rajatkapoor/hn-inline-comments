import {
  Button,
  Input,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { createContext, useContext, useState, useRef } from "react";
import { postComment } from "../services/comment.service";
import {
  addCommentToCommentThread,
  createCommentThread,
} from "../services/commentThread.service";
import createTempCommentThread from "../utils/createTempCommentThread";
import canCreateCommentThreadOnSelection from "../utils/canCreateCommentThreadOnSelection";
import { useSelection } from "../stores/selection.store";

export const CommentsDrawerContext = createContext();
export const MODE = {
  ADD: "ADD",
  VIEW: "VIEW",
};

export const CommentsDrawerProvider = ({ children, id, post }) => {
  const hiddenPosition = [-1000, 1000];
  const [commentButtonPosition, setCommentButtonPosition] =
    useState(hiddenPosition);
  const [commentThreadId, setCommentThreadId] = useState("temp");
  let mode;
  if (commentThreadId === "temp") {
    mode = MODE.ADD;
  } else {
    mode = MODE.VIEW;
  }
  let timeoutHandle = useRef(null);
  const showCommentButton = (
    commentThreadId,
    [top, right],
    autoHide = false
  ) => {
    setCommentThreadId(commentThreadId);
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
        mode,
        commentThreadId,
      }}
    >
      {children}
    </CommentsDrawerContext.Provider>
  );
};

const CommentsDrawer = ({ addCommentThreadToCurrentDoc }) => {
  const commentDrawerContext = useContext(CommentsDrawerContext);
  if (!commentDrawerContext) {
    throw new Error(
      "CommentsDrawer must be used within a CommentsDrawerProvider"
    );
  }
  const { commentButtonPosition, mode, commentThreadId } = commentDrawerContext;
  const { selection, updateSelection } = useSelection();

  const { isOpen, onOpen, onClose } = useDisclosure();
  let buttonText;
  if (mode === MODE.ADD) {
    buttonText = "Add Comments";
  } else {
    buttonText = "View Comments";
  }
  const { values, handleChange, handleSubmit, setFieldValue, resetForm } =
    useFormik({
      initialValues: { text: "" },
      onSubmit: async (values) => {
        const newComment = await postComment(values.text);
        if (mode === MODE.ADD) {
          //create comment thread
          const newCommentThreadId = await createCommentThread({
            comments: [newComment],
          });

          const success = await addCommentThreadToCurrentDoc(
            newCommentThreadId
          );
        } else {
          // view mode
          // add comment to thread
          const success = await addCommentToCommentThread(
            newComment,
            commentThreadId
          );
        }

        resetForm();
        // also notify user that the comment was added
        onClose();
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
          if (
            mode === MODE.ADD &&
            canCreateCommentThreadOnSelection(selection)
          ) {
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
          <DrawerCloseButton />
          <DrawerHeader>Add a comment</DrawerHeader>

          <DrawerBody>
            <form id="my-form" onSubmit={handleSubmit}>
              <Input
                name="text"
                placeholder="Type comment here..."
                defaultValue={values.text}
                onChange={handleChange}
              />
            </form>
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
