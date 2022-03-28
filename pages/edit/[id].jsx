import { Box, Skeleton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import Editor from "../../components/Editor";
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
      {!post && <Skeleton />}
      {post && <Editor {...post} />}
    </Box>
  );
};

export default EditPage;
