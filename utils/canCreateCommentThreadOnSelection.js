const canCreateCommentThreadOnSelection = () => {
  const sel = window.getSelection();
  const { anchorOffset, focusOffset } = sel;
  if (sel.rangeCount && anchorOffset !== focusOffset) {
    return true;
  } else {
    return false;
  }
};

export default canCreateCommentThreadOnSelection;
