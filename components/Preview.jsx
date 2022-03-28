import { Remark } from "react-remark";
import WithInlineComments from "./WithInlineComments";
import remarkDirective from "remark-directive";
import hashnodeCommentPlugin from "../plugins/HashnodeComment.plugin";
import { useState } from "react";
import { usePost } from "../stores/post.store";

const Preview = () => {
  const {
    post: { content },
    id,
    updatePost,
  } = usePost();
  const updatePostContent = (updatedContent) => {
    updatePost(id, { ...post, content: updatedContent });
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
              return WithInlineComments(node, props, updatePostContent);
            },
            strong: ({ node, ...props }) => {
              return WithInlineComments(node, props, updatePostContent);
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
