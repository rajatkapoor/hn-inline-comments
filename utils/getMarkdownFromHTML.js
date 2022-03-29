import { all } from "hast-util-to-mdast";
import rehypeParse from "rehype-parse";
import rehypeRemark from "rehype-remark";
import remarkDirective from "remark-directive";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import hashnodeCommentPlugin from "../plugins/HashnodeComment.plugin";

const getMarkdownFromHTML = async (commentThreadId) => {
  const newHtml = document.querySelector(".post-preview").innerHTML;
  const file = await unified()
    .use(rehypeParse)

    .use(rehypeRemark, {
      handlers: {
        ["span"]: (h, node, parent) => {
          if (!!node.properties.dataCommentThreadId) {
            const { dataCommentThreadId } = node.properties;

            const commentNode = h(
              node,
              "textDirective",
              {
                name: "hn-comment-thread",
                attributes: {
                  "data-comment-thread-id": commentThreadId,
                },
              },

              all(h, node)
            );
            return commentNode;
          }

          return all(h, node);
        },
      },
    })
    .use(remarkDirective)
    .use(hashnodeCommentPlugin)
    .use(remarkStringify)
    .process(newHtml);

  const markdown = String(file);
  return markdown;
};

export default getMarkdownFromHTML;
