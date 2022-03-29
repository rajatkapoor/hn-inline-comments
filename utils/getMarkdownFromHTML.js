import { all } from "hast-util-to-mdast";
import rehypeParse from "rehype-parse";
import rehypeRemark from "rehype-remark";
import remarkDirective from "remark-directive";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import hashnodeCommentPlugin from "../plugins/HashnodeComment.plugin";

const getMarkdownFromHTML = async (commentThreadId, contentText = "") => {
  const newHtml = document.querySelector(".post-preview").innerHTML;

  let finalCommentThreadId;
  const file = await unified()
    .use(rehypeParse)

    .use(rehypeRemark, {
      handlers: {
        ["span"]: (h, node, parent) => {
          let children = all(h, node);
          if (!!node.properties.dataCommentThreadId) {
            const { dataCommentThreadId } = node.properties;
            // replace the temp comment thread id with the actual comment thread id
            if (dataCommentThreadId === "temp") {
              finalCommentThreadId = commentThreadId;
            } else {
              finalCommentThreadId = dataCommentThreadId;
            }
            // replace the content text with the text of the accepted comment
            if (commentThreadId === dataCommentThreadId && contentText) {
              children = [h(node, "text", contentText)];
            }

            const commentNode = h(
              node,
              "textDirective",
              {
                name: "hn-comment-thread",
                attributes: {
                  "data-comment-thread-id": finalCommentThreadId,
                },
              },

              children
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
