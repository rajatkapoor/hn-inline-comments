import { useRef } from "react";
import convertEditableHTMLToMarkdown from "../utils/convertEditableHTMLToMarkdown";
import convertMarkdownToEditableHTML from "../utils/convertMarkdownToEditableHTML";

const markdown = `
  :hn-comment[Video of a cat in a box]{data-comment-id="12345"} ok ok 
`;

const Editor = () => {
  const editorRef = useRef();
  const editableHtml = convertMarkdownToEditableHTML(markdown);
  const handleSaveClick = async (e) => {
    const html = editorRef.current.innerHTML;

    const markdown = convertEditableHTMLToMarkdown(html);
    //@todo: send this markdown to server
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
