import { Stack, Flex, Text } from "@chakra-ui/react";
import React from "react";

const CommentThread = ({ comments }) => {
  return (
    <Stack spacing={2}>
      {comments.map((comment) => (
        <Flex key={comment.id} px={2} shadow="md">
          <Text>{comment.text}</Text>
        </Flex>
      ))}
    </Stack>
  );
};

export default CommentThread;
