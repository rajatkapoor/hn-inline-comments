import { Remark } from "react-remark";
import remarkDirective from "remark-directive";
import hashnodeCommentPlugin from "../plugins/HashnodeComment.plugin";
import { usePost } from "../stores/post.store";
import getMarkdownFromHTML from "../utils/getMarkdownFromHTML";
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
              return WithInlineComments(node, props, addCommentToCurrentDoc);
            },
            strong: ({ node, ...props }) => {
              return WithInlineComments(node, props, addCommentToCurrentDoc);
            },
            ["hn-comment"]: ({ node, ...props }) => {
              return (
                <CommentSpan {...props} />
                // <span
                //   style={{ backgroundColor: "yellow" }}
                //   {...props}
                //   onClick
                // />
              );
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
