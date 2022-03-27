import { Remark } from "react-remark";
import WithInlineComments from "./WithInlineComments";
import remarkDirective from "remark-directive";
import hashnodeCommentPlugin from "../plugins/HashnodeComment.plugin";

const markdown2 = `
# this is a heading

AKJSNDFKJN 
a
sd
fa
s

  :hn-comment[Video of a cat in a box]{data-comment-id="12345"} ok ok 
`;

const Preview = () => {
  return (
    <Remark
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
          ["hn-comment"]: ({ node, ...props }) => {
            return <span style={{ backgroundColor: "yellow" }} {...props} />;
          },
        },
      }}
    >
      {markdown2}
    </Remark>
  );
};

export default Preview;
