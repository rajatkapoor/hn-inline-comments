import { Heading, Spinner, Stack, StackDivider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import useLoading from "../hooks/useLoading";
import { getPosts } from "../services/post.service";

export default function Home() {
  const { isLoading, stopLoading } = useLoading();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then((posts) => {
      setPosts(posts);
      stopLoading();
    });
  }, []);

  return (
    <Stack>
      <Heading>Your posts</Heading>
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
