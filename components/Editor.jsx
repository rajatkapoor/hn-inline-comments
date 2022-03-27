import React from "react";

const markdown2 = `
# this is a heading
AKJSNDFKJN 
a
sd
fa
s

  :hn-comment[Video of a cat in a box]{data-comment-id="12345"} ok ok 
`;

const replaceComments = (text) => {
  const regex = /:hn-comment\[(.*?)\]\{data-comment-id="(.*?)"\}/g;
  let match;
  let newText = text;
  while ((match = regex.exec(text))) {
    newText = newText.replace(
      match[0],
      `<span data-comment-id="${match[2]}">${match[1]}</span>`
    );
  }
  return newText;
};

const Editor = () => {
  const markdownAsHtmlWithCommentSpans = replaceComments(markdown2);
  console.log(
    "🚀 ~ file: Editor.jsx ~ line 30 ~ Editor ~ markdownAsHtmlWithCommentSpans",
    markdownAsHtmlWithCommentSpans
  );
  return (
    <div>
      <div
        contentEditable={true}
        dangerouslySetInnerHTML={{ __html: markdownAsHtmlWithCommentSpans }}
      ></div>
    </div>
  );
};

export default Editor;
