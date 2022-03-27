const convertTextToHtml = (text) => {
  const html = text.replace(/\n/g, "<br />");
  return html;
};

const replaceHNCommentsWithSpans = (text) => {
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

const convertMarkdownToEditableHTML = (markDownText) => {
  const markdownAsHtmlWithCommentSpans =
    replaceHNCommentsWithSpans(markDownText);
  const editableHtml = convertTextToHtml(markdownAsHtmlWithCommentSpans);
  return editableHtml;
};

export default convertMarkdownToEditableHTML;
