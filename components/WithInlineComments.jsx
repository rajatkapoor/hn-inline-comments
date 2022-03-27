import React from "react";

// eslint-disable-next-line react/display-name
const WithInlineComments = (node, props) => {
  const style = {
    border: "1px solid red",
  };

  const onMouseDown = (e) => {
    //@todo: Add some details somewhere to capture the current node
  };

  const onMouseUp = (e) => {
    //@todo: Check whether this ends up being in the same node and if commenting is possible

    const { anchorOffset, focusOffset } = window.getSelection();
    console.log(
      "🚀 ~ file: WithInlineComments.jsx ~ line 43 ~ onMouseUp ~ anchorOffset, focusOffset ",
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
