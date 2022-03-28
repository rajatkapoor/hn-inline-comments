// import { h } from "hastscript";
import { Button, Portal } from "@chakra-ui/react";
import { all } from "hast-util-to-mdast";
import React, { useState } from "react";
import rehypeParse from "rehype-parse";
import rehypeRemark from "rehype-remark";
import remarkDirective from "remark-directive";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import hashnodeCommentPlugin from "../plugins/HashnodeComment.plugin";

// eslint-disable-next-line react/display-name
const WithInlineComments = (node, props, setMarkdown) => {
  const [showCommentBox, setShowCommentBox] = useState(false);
  // };

  const onMouseDown = (e) => {
    //@todo: Add some details somewhere to capture the current node
  };

  const onMouseUp = async (e) => {
    //@todo: Check whether this ends up being in the same node and if commenting is possible
    const commentSpan = document.createElement("span");

    commentSpan.dataset.commentId = "12345";
    commentSpan.style.backgroundColor = "yellow";

    const sel = window.getSelection();
    const { anchorOffset, focusOffset } = sel;
    if (sel.rangeCount && anchorOffset !== focusOffset) {
      setShowCommentBox(true);
      const range = sel.getRangeAt(0).cloneRange();
      range.surroundContents(commentSpan);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  };
  const addComment = async () => {
    const newHtml = document.querySelector(".post-preview").innerHTML;
    const file = await unified()
      .use(rehypeParse)

      .use(rehypeRemark, {
        handlers: {
          ["span"]: (h, node, parent) => {
            if (!!node.properties.dataCommentId) {
              const { dataCommentId } = node.properties;

              const commentNode = h(
                node,
                "textDirective",
                {
                  name: "hn-comment",
                  attributes: {
                    "data-comment-id": dataCommentId,
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

    setMarkdown(markdown);
  };

  const Element = React.createElement(node.tagName, {
    ...props,
    onMouseDown,
    onMouseUp,
  });
  return (
    <>
      {Element}
      {showCommentBox && (
        <Portal>
          <Button onClick={addComment}>add comment</Button>
        </Portal>
      )}
    </>
  );
};

export default WithInlineComments;
