import { Box, useToast } from "@chakra-ui/react";
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
import nodesSupportingComments from "../config";

const Preview = () => {
  const {
    post: { content },
    id,
    updateContent,
  } = usePost();
  const toast = useToast();

  const addCommentThreadToCurrentDoc = async (commentThreadId) => {
    const content = await getMarkdownFromHTML(commentThreadId);
    await updateContent(id, content);
    toast({
      title: "Comment added",
      status: "success",
      duration: 3000,
    });
  };
  const acceptSuggestion = async (commentThreadId, comment) => {
    const content = await getMarkdownFromHTML(commentThreadId, comment.text);
    await updateContent(id, content);
    toast({
      title: "Suggestion accepted",
      status: "success",
      duration: 3000,
    });
  };
  const components = nodesSupportingComments.reduce((obj, item) => {
    return {
      ...obj,
      [item]: ({ node, ...props }) => {
        return WithInlineComments(node, props);
      },
    };
  }, {});

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
                    ...components,
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
              acceptSuggestion={acceptSuggestion}
              addCommentThreadToCurrentDoc={addCommentThreadToCurrentDoc}
            />
          </Box>
        </CommentsDrawerProvider>
      </CommentThreadProvider>
    </SelectionProvider>
  );
};

export default Preview;
