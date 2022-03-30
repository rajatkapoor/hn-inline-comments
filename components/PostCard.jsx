import { Button, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

const PostCard = ({ id, deletePost }) => {
  const router = useRouter();
  return (
    <HStack key={id} justifyContent="space-between" my={4}>
      <Stack>
        <Heading size={"md"}>{id}</Heading>
      </Stack>
      <HStack>
        <Button
          colorScheme={"blue"}
          variant={"outline"}
          rounded={"3xl"}
          onClick={() => router.push(`/drafts/${id}`)}
        >
          Continue writing
        </Button>
        <Button
          variant={"ghost"}
          colorScheme="red"
          onClick={() => deletePost(id)}
        >
          Delete
        </Button>
      </HStack>
    </HStack>
  );
};

export default PostCard;
