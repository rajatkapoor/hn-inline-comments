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
import React from "react";

const CommentsDrawer = ({ addComment }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} pos="relative">
        Add Comment
      </Button>
      <Drawer isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Add a comment</DrawerHeader>

          <DrawerBody>
            <form
              id="my-form"
              onSubmit={(e) => {
                e.preventDefault();
                addComment();
              }}
            >
              <Input name="text" placeholder="Type comment here..." />
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
