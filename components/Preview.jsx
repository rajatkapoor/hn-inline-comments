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
import { SelectionProvider } from "../stores/selection.store";
import { CommentThreadProvider } from "../stores/commentThread.store";

const Preview = () => {
  const {
    post: { content },
    id,
    updateContent,
  } = usePost();

  const addCommentThreadToCurrentDoc = async (commentThreadId) => {
    const content = await getMarkdownFromHTML(commentThreadId);
    await updateContent(id, content);
  };

  return (
    <SelectionProvider>
      <CommentThreadProvider>
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
                      return WithInlineComments(node, props);
                    },
                    strong: ({ node, ...props }) => {
                      return WithInlineComments(node, props);
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
              addCommentThreadToCurrentDoc={addCommentThreadToCurrentDoc}
              buttonText="View Comments"
            />
          </Box>
        </CommentsDrawerProvider>
      </CommentThreadProvider>
    </SelectionProvider>
  );
};

export default Preview;
