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
import React, { createContext, useContext, useState } from "react";
import { postComment } from "../services/comment.service";

export const CommentsDrawerContext = createContext();

export const CommentsDrawerProvider = ({ children, id, post }) => {
  const [commentButtonPosition, setCommentButtonPosition] = useState([
    -1000, 1000,
  ]);

  return (
    <CommentsDrawerContext.Provider
      value={{
        commentButtonPosition,
        setCommentButtonPosition,
      }}
    >
      {children}
    </CommentsDrawerContext.Provider>
  );
};

const CommentsDrawer = ({
  buttonText = "Add Comments",
  addCommentToCurrentDoc,
}) => {
  const context = useContext(CommentsDrawerContext);
  if (!context) {
    throw new Error(
      "CommentsDrawer must be used within a CommentsDrawerProvider"
    );
  }
  const { commentButtonPosition, setCommentButtonPosition } = context;

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
      <Button onClick={onOpen} pos="relative">
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
