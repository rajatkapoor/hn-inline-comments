import { Remark } from "react-remark";
import WithInlineComments from "./WithInlineComments";
import remarkDirective from "remark-directive";
import hashnodeCommentPlugin from "../plugins/HashnodeComment.plugin";
import { useState, useEffect } from "react";

const markdown2 = `

# title
this is a Vi **deo** of a cat in a box ok ok

`;

const Preview = () => {
  const [markdown, setMarkdown] = useState(markdown2);
  console.log(
    "🚀 ~ file: Preview.jsx ~ line 16 ~ Preview ~ markdown",
    markdown
  );

  return (
    <div className="post-preview">
      <Remark
        key={markdown}
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
        {markdown}
      </Remark>
    </div>
  );
};

export default Preview;
