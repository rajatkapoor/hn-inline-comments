import { Button, Stack, useToast } from "@chakra-ui/react";
import { useRef } from "react";
import { updatePost } from "../services/post.service";
import convertEditableHTMLToMarkdown from "../utils/convertEditableHTMLToMarkdown";
import convertMarkdownToEditableHTML from "../utils/convertMarkdownToEditableHTML";
import Title from "./Title";

const Editor = (post) => {
  const { content, id } = post;
  const toast = useToast();
  const editorRef = useRef();
  const editableHtml = convertMarkdownToEditableHTML(content);
  const handleSaveClick = async () => {
    const html = editorRef.current.innerHTML;
    const markdown = convertEditableHTMLToMarkdown(html);
    await updatePost(id, markdown);
    toast({
      title: "Post updated",
      description: "Your post has been updated",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Stack>
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
      <Button onClick={handleSaveClick}>save</Button>
    </Stack>
  );
};

export default Editor;
