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
import createTempComment from "../utils/createTempComment";
import canCreateCommentOnSelection from "../utils/canCreateCommentOnSelection";

export const CommentsDrawerContext = createContext();

export const CommentsDrawerProvider = ({ children, id, post }) => {
  const hiddenPosition = [-1000, 1000];
  const [buttonText, setButtonText] = useState("Add Comments");
  const [commentButtonPosition, setCommentButtonPosition] =
    useState(hiddenPosition);

  let timeoutHandle = useRef(null);
  const showCommentButton = (text, [top, right], autoHide = false) => {
    clearTimeout(timeoutHandle.current);
    setButtonText(text);
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
        buttonText,
        showCommentButton,
        hideCommentButton,
      }}
    >
      {children}
    </CommentsDrawerContext.Provider>
  );
};

const CommentsDrawer = ({ addCommentToCurrentDoc }) => {
  const context = useContext(CommentsDrawerContext);
  if (!context) {
    throw new Error(
      "CommentsDrawer must be used within a CommentsDrawerProvider"
    );
  }
  const { commentButtonPosition, buttonText } = context;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { values, handleChange, handleSubmit, setFieldValue, resetForm } =
    useFormik({
      initialValues: { text: "" },
      onSubmit: async (values) => {
        const commentId = await postComment(values.text);
        await addCommentToCurrentDoc(commentId);
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
          if (canCreateCommentOnSelection()) {
            createTempComment();
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
