import { Input } from "@chakra-ui/react";
import React from "react";

const CommentInput = ({ handleChange, handleSubmit, defaultValue }) => {
  return (
    <form id="my-form" onSubmit={handleSubmit}>
      <Input
        name="text"
        placeholder="Type comment here..."
        defaultValue={defaultValue}
        onChange={handleChange}
      />
    </form>
  );
};

export default CommentInput;
