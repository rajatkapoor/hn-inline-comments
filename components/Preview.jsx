import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { Remark } from "react-remark";
import remarkDirective from "remark-directive";
import hashnodeCommentPlugin from "../plugins/HashnodeComment.plugin";
import { usePost } from "../stores/post.store";
import getMarkdownFromHTML from "../utils/getMarkdownFromHTML";
import CommentsDrawer, { CommentsDrawerProvider } from "./CommentsDrawer";
import CommentSpan from "./CommentSpan";
import WithInlineComments from "./WithInlineComments";

const Preview = () => {
  const {
    post: { content },
    id,
    updateContent,
  } = usePost();

  const addCommentToCurrentDoc = async (commentId) => {
    const content = await getMarkdownFromHTML(commentId);
    await updateContent(id, content);
  };
  const [addCommentBoxPosition, setAddCommentBoxPosition] = useState([
    -1000, -1000,
  ]);

  return (
    <CommentsDrawerProvider>
      <Box>
        <Box className="post-preview">
          <Remark
            key={content}
            remarkPlugins={[remarkDirective, hashnodeCommentPlugin]}
            remarkToRehypeOptions={{ allowDangerousHtml: true }}
            rehypeReactOptions={{
              passNode: true,
              components: {
                p: ({ node, ...props }) => {
                  return WithInlineComments(
                    node,
                    props,
                    addCommentToCurrentDoc
                  );
                },
                strong: ({ node, ...props }) => {
                  return WithInlineComments(
                    node,
                    props,
                    addCommentToCurrentDoc
                  );
                },
                ["hn-comment-thread"]: ({ node, ...props }) => {
                  return <CommentSpan {...props} />;
                },
              },
            }}
          >
            {content}
          </Remark>
        </Box>

        <CommentsDrawer
          addCommentToCurrentDoc={addCommentToCurrentDoc}
          buttonText="View Comments"
        />
      </Box>
    </CommentsDrawerProvider>
  );
};

export default Preview;
