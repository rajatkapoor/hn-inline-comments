import {
  Box,
  Spinner,
  Stack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import Editor from "../../components/Editor";
import Title from "../../components/Title";
import { getPost } from "../../services/post.service";

const EditPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);
  useEffect(() => {
    if (id) {
      getPost(id).then((post) => {
        setPost(post);
      });
    }
  }, [id]);

  return (
    <Box>
      {!post && <Spinner />}
      {post && (
        <Stack>
          <Title></Title>
          <Tabs isLazy>
            <TabList>
              <Tab>Write</Tab>
              <Tab>Preview</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Editor {...post} />
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      )}
    </Box>
  );
};

export default EditPage;
