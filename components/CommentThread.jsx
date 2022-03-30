import { Stack, Flex, Text, Button, HStack } from "@chakra-ui/react";
import React from "react";

const CommentThread = ({ comments, acceptSuggestion }) => {
  return (
    <Stack spacing={2}>
      {comments.map((comment) => (
        <HStack key={comment.id} px={2} shadow="md" data-cy="comment-card">
          <Text>{comment.text}</Text>
          {comment.isSuggestion && (
            <Button
              size={"sm"}
              onClick={() => acceptSuggestion(comment)}
              data-cy="accept-suggestion-button"
            >
              Accept suggestion
            </Button>
          )}
        </HStack>
      ))}
    </Stack>
  );
};

export default CommentThread;
