import {
  Button,
  Heading,
  HStack,
  Spinner,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import useLoading from "../hooks/useLoading";
import { getPosts, createPost } from "../services/post.service";

export default function Home() {
  const { isLoading, stopLoading } = useLoading();
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  useEffect(() => {
    getPosts().then((posts) => {
      setPosts(posts);
      stopLoading();
    });
  }, []);

  const handleCreatePost = () => {
    createPost().then((post) => {
      router.push(`/drafts/${post.id}`);
    });
  };

  return (
    <Stack>
      <HStack>
        <Heading>Your posts</Heading>
        <Button onClick={handleCreatePost}>Create new post</Button>
      </HStack>

      {isLoading && <Spinner />}
      <Stack divider={<StackDivider />}>
        {!isLoading &&
          posts.map((post) => {
            return <PostCard key={post.id} {...post} />;
          })}
      </Stack>
    </Stack>
  );
}
