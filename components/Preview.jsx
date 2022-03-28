import { Remark } from "react-remark";
import WithInlineComments from "./WithInlineComments";
import remarkDirective from "remark-directive";
import hashnodeCommentPlugin from "../plugins/HashnodeComment.plugin";
import { useState } from "react";
import { usePost } from "../stores/post.store";
import getMarkdownFromHTML from "../utils/getMarkdownFromHTML";

const Preview = () => {
  const {
    post: { content },
    id,
    updateContent,
  } = usePost();
  const updateCurrentDoc = (content) => {
    updateContent(id, content);
  };
  const addCommentToCurrentDoc = async (commentId) => {
    const content = await getMarkdownFromHTML(commentId);
    await updateContent(id, content);
  };

  return (
    <div className="post-preview">
      <Remark
        key={content}
        remarkPlugins={[remarkDirective, hashnodeCommentPlugin]}
        remarkToRehypeOptions={{ allowDangerousHtml: true }}
        rehypeReactOptions={{
          passNode: true,
          components: {
            p: ({ node, ...props }) => {
              return WithInlineComments(node, props, updateCurrentDoc);
            },
            strong: ({ node, ...props }) => {
              return WithInlineComments(node, props, updateContent);
            },
            ["hn-comment"]: ({ node, ...props }) => {
              return <span style={{ backgroundColor: "yellow" }} {...props} />;
            },
          },
        }}
      >
        {content}
      </Remark>
    </div>
  );
};

export default Preview;
