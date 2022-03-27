import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeRemark, { defaultHandlers } from "rehype-remark";
import remarkStringify from "remark-stringify";
import { useRemark } from "react-remark";
import remarkDirective from "remark-directive";
import hashnodeCommentPlugin from "../plugins/HashnodeComment.plugin";

const convertHTMLToMarkdown = async (html) => {
  const markdown = await unified()
    .use(rehypeParse)
    // .use(remarkDirective)
    // .use(hashnodeCommentPlugin)
    // // .use(rehypeRemark, {
    // //   handlers: {
    // //     ...defaultHandlers,
    // //     span: (h, node) => {
    // //       const { properties } = node;
    // //       //   console.log(
    // //       //     "🚀 ~ file: convertHTMLToMarkdown.js ~ line 14 ~ convertHTMLToMarkdown ~ node",
    // //       //     node
    // //       //   );
    // //       //   if (properties && properties.dataCommentId) {
    // //       //     return h(`span[data-comment-id=${properties.dataCommentId}]`, {

    // //       //     });
    // //       //   }
    // //       defaultHandlers.span(h, node);
    // //     },
    // //   },
    // // })
    .use(remarkStringify)
    .process(html);

  console.log(
    "🚀 ~ file: convertHTMLToMarkdown.js ~ line 11 ~ convertHTMLToMarkdown ~ markdown",
    markdown
  );
  return String(markdown);
};

export default convertHTMLToMarkdown;
