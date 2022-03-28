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
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React from "react";
import { postComment } from "../services/comment.service";

const CommentsDrawer = ({
  buttonText = "Add Comments",
  addCommentToCurrentDoc,
}) => {
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
    <>
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
    </>
  );
};
export default CommentsDrawer;
