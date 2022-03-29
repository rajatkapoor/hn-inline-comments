import { Input, Button, Checkbox, Stack, Heading } from "@chakra-ui/react";
import { useFormik } from "formik";
import React from "react";

const CommentInputForm = ({ onCommentSubmit }) => {
  const handleCommentSubmit = (values, { resetForm }) => {
    onCommentSubmit(values);
    resetForm({ values: { text: "", isSuggestion: false } });
  };

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: { text: "", isSuggestion: false },
    onSubmit: handleCommentSubmit,
  });

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <Input
          name="text"
          placeholder="Type comment here..."
          value={values.text}
          onChange={handleChange}
        />
        <Checkbox
          name="isSuggestion"
          checked={values.isSuggestion}
          onChange={handleChange}
        >
          Is a suggestion
        </Checkbox>
        <Button type="submit">Save</Button>
      </Stack>
    </form>
  );
};

export default CommentInputForm;
