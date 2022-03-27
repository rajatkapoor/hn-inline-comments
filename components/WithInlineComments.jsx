import React from "react";

// eslint-disable-next-line react/display-name
const WithInlineComments = (node, props) => {
  const style = {
    border: "1px solid red",
  };

  const onMouseDown = (e) => {
    console.log(
      "🚀 ~ file: WithInlineComments.jsx ~ line 13 ~ onMouseDown ~ e",
      e
    );
  };
  const onMouseUp = (e) => {
    console.log(
      "🚀 ~ file: WithInlineComments.jsx ~ line 13 ~ onMouseDown ~ e",
      e
    );
    console.log(node);
    const { anchorOffset, focusOffset } = window.getSelection();
    console.log(
      "🚀 ~ file: WithInlineComments.jsx ~ line 48 ~ onMouseUp ~ anchorOffset, focusOffset",
      anchorOffset,
      focusOffset
    );
  };

  return React.createElement(node.tagName, {
    ...props,
    style,
    onMouseDown,
    onMouseUp,
  });
};

export default WithInlineComments;
