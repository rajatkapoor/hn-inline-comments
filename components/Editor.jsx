import {
  Box,
  Button,
  Input,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useRef } from "react";
// import { updatePost } from "../services/post.service";
import { usePost } from "../stores/post.store";
import convertEditableHTMLToMarkdown from "../utils/convertEditableHTMLToMarkdown";
import convertMarkdownToEditableHTML from "../utils/convertMarkdownToEditableHTML";

const Editor = () => {
  const { post, id, updateContent } = usePost();
  const { content } = post;
  const toast = useToast();
  const editorRef = useRef();
  const editableHtml = convertMarkdownToEditableHTML(content);

  const handleSaveClick = async () => {
    const html = editorRef.current.innerHTML;
    const markdown = convertEditableHTMLToMarkdown(html);
    await updateContent(id, markdown);
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
      <Box
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
