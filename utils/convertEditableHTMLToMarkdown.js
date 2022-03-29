import sanitizeHtml from "sanitize-html";

const replaceCommentsSpansWithHNCommentDirective = (text) => {
  const regex = /<span data-comment-thread-id="(.*)">(.*?)<\/span>/g;
  let match;
  let newText = text;
  while ((match = regex.exec(text))) {
    newText = newText.replace(
      match[0],
      `:hn-comment-thread[${match[2]}]{data-comment-thread-id="${match[1]}"}`
    );
  }
  return newText;
};

const replaceBrWithNewLine = (text) => {
  const regex = /<br\s?\/?>/g;
  let match;
  let newText = text;
  while ((match = regex.exec(text))) {
    newText = newText.replace(match[0], "\n");
  }
  return newText;
};

const convertEditableHTMLToMarkdown = (editableHtml) => {
  const sanitized = sanitizeHtml(editableHtml, {
    allowedTags: ["br", "span"],
    allowedAttributes: {
      span: ["data-comment-thread-id"],
    },
  });
  const withNewLines = replaceBrWithNewLine(sanitized);
  const markdown = replaceCommentsSpansWithHNCommentDirective(withNewLines);
  return markdown;
};

export default convertEditableHTMLToMarkdown;
