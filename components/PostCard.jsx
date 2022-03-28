import { Button, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

const PostCard = ({ id, content }) => {
  const router = useRouter();
  return (
    <HStack key={id} justifyContent="space-between" my={4}>
      <Stack>
        <Heading size={"md"}>{id}</Heading>
        <Text isTruncated width={"md"}>
          {content}
        </Text>
      </Stack>
      <HStack>
        <Button
          colorScheme={"blue"}
          variant={"outline"}
          rounded={"3xl"}
          onClick={() => router.push(`/edit/${id}`)}
        >
          Continue writing
        </Button>
        <Button variant={"ghost"} colorScheme="red">
          Delete
        </Button>
      </HStack>
    </HStack>
  );
};

export default PostCard;
