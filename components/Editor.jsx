import { useRef } from "react";
import convertHTMLToMarkdown from "../utils/convertHTMLToMarkdown";
import convertTextToHtml from "../utils/convertTextToHtml";
import replaceHNCommentsWithSpans from "../utils/replaceHNCommentsWithSpans";

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
  const editorRef = useRef();
  const markdownAsHtmlWithCommentSpans = replaceHNCommentsWithSpans(markdown);
  const handleSaveClick = async (e) => {
    const html = editorRef.current.innerHTML;
    const markdown = await convertHTMLToMarkdown(html);
    console.log(
      "🚀 ~ file: Editor.jsx ~ line 24 ~ handleSaveClick ~ markdown",
      markdown
    );
  };
  return (
    <div>
      <div
        contentEditable={true}
        dangerouslySetInnerHTML={{
          __html: convertTextToHtml(markdownAsHtmlWithCommentSpans),
        }}
        ref={editorRef}
      />
      <button onClick={handleSaveClick}>save</button>
    </div>
  );
};

export default Editor;
