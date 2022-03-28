import { Button, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { posts as postsCollection } from "../utils/firebase";

export default function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getDocs(postsCollection).then((res) => {
      const docs = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setPosts(docs);
    });
  }, []);

  return (
    <Stack>
      <Heading>Your posts</Heading>
      <Stack>
        {posts.map((post) => {
          return (
            <HStack key={post.id} justifyContent="space-between">
              <Stack>
                <Heading size={"md"}>{post.id}</Heading>
                <Text isTruncated>{post.content}</Text>
              </Stack>
              <HStack>
                <Button
                  colorScheme={"blue"}
                  variant={"outline"}
                  rounded={"3xl"}
                >
                  Continue writing
                </Button>
                <Button variant={"ghost"} colorScheme="red">
                  Delete
                </Button>
              </HStack>
            </HStack>
          );
        })}
      </Stack>
    </Stack>
  );
}
