import { useRef } from "react";
import convertEditableHTMLToMarkdown from "../utils/convertEditableHTMLToMarkdown";
import convertTextToHtml from "../utils/convertTextToHtml";
import replaceHNCommentsWithSpans from "../utils/replaceHNCommentsWithSpans";

const markdown = `
  :hn-comment[Video of a cat in a box]{data-comment-id="12345"} ok ok 
`;

const Editor = () => {
  const editorRef = useRef();
  const markdownAsHtmlWithCommentSpans = replaceHNCommentsWithSpans(markdown);
  const editableHtml = convertTextToHtml(markdownAsHtmlWithCommentSpans);
  const handleSaveClick = async (e) => {
    const html = editorRef.current.innerHTML;

    const markdown = convertEditableHTMLToMarkdown(html);
    console.log(
      "🚀 ~ file: Editor.jsx ~ line 19 ~ handleSaveClick ~ markdown",
      markdown
    );
  };

  return (
    <div>
      <div
        contentEditable={true}
        dangerouslySetInnerHTML={{
          __html: editableHtml,
        }}
        ref={editorRef}
        style={{
          border: "1px solid red",
          height: "500px",
          padding: "10px",
        }}
      />
      <button onClick={handleSaveClick}>save</button>
    </div>
  );
};

export default Editor;
