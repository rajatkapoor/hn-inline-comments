import {
  Box,
  Spinner,
  Stack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import Editor from "../../components/Editor";
import Preview from "../../components/Preview";
import Title from "../../components/Title";
import { getPost } from "../../services/post.service";
import { PostProvider } from "../../stores/post.store";

const EditPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);
  useEffect(() => {
    if (id === "new") {
      setPost({
        content: "",
      });
    } else if (id) {
      getPost(id).then(({ post }) => {
        setPost(post);
      });
    }
  }, [id]);

  return (
    <Stack spacing={4}>
      <Flex>
        <Button onClick={() => router.push("/")}>Go back to all drafts</Button>
      </Flex>
      {!post && <Spinner />}
      {post && (
        <PostProvider id={id} post={post}>
          <Stack>
            <Tabs variant={"soft-rounded"}>
              <TabList>
                <Tab>Write</Tab>
                <Tab>Preview</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Editor />
                </TabPanel>
                <TabPanel>
                  <Preview />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Stack>
        </PostProvider>
      )}
    </Stack>
  );
};

export default EditPage;
