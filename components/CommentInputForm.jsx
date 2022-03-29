import { Input, Button, others, Heading } from "@chakra-ui/react";
import { useFormik } from "formik";
import React from "react";

const CommentInputForm = ({ onCommentSubmit }) => {
  const handleCommentSubmit = (values, { resetForm }) => {
    resetForm({ values: { text: "" } });
    onCommentSubmit(values);
  };
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: { text: "" },
    onSubmit: handleCommentSubmit,
  });

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="text"
        placeholder="Type comment here..."
        value={values.text}
        onChange={handleChange}
      />
      <Button type="submit">Save</Button>
    </form>
  );
};

export default CommentInputForm;
