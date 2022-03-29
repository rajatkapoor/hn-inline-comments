const canCreateCommentThreadOnSelection = (selection) => {
  const { anchorOffset, focusOffset } = selection;
  if (selection.rangeCount && anchorOffset !== focusOffset) {
    return true;
  } else {
    return false;
  }
};

export default canCreateCommentThreadOnSelection;
