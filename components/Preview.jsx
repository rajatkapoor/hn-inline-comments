import { Remark } from "react-remark";
import WithInlineComments from "./WithInlineComments";
import remarkDirective from "remark-directive";
import hashnodeCommentPlugin from "../plugins/HashnodeComment.plugin";
import { useState } from "react";

const Preview = ({ content, id }) => {
  const [markDown, setMarkdown] = useState(content);
  return (
    <div className="post-preview">
      <Remark
        key={markDown}
        remarkPlugins={[remarkDirective, hashnodeCommentPlugin]}
        remarkToRehypeOptions={{ allowDangerousHtml: true }}
        rehypeReactOptions={{
          passNode: true,
          components: {
            p: ({ node, ...props }) => {
              return WithInlineComments(node, props, setMarkdown);
            },
            strong: ({ node, ...props }) => {
              return WithInlineComments(node, props, setMarkdown);
            },
            ["hn-comment"]: ({ node, ...props }) => {
              return <span style={{ backgroundColor: "yellow" }} {...props} />;
            },
          },
        }}
      >
        {markDown}
      </Remark>
    </div>
  );
};

export default Preview;
