import React from "react";
import replaceHNCommentsWithSpans from "../utils/replaceHNCommentsWithSpans";
import convertTextToHtml from "../utils/convertTextToHtml";

const markdown = `
# this is a heading

AKJSNDFKJN 
a
sd
fa
s

  :hn-comment[Video of a cat in a box]{data-comment-id="12345"} ok ok 
`;

const Editor = () => {
  const markdownAsHtmlWithCommentSpans = replaceHNCommentsWithSpans(markdown);
  return (
    <div>
      <div
        contentEditable={true}
        dangerouslySetInnerHTML={{
          __html: convertTextToHtml(markdownAsHtmlWithCommentSpans),
        }}
      />
    </div>
  );
};

export default Editor;
