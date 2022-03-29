const createTempComment = (commentSpanElement) => {
  const sel = window.getSelection();
  const range = sel.getRangeAt(0).cloneRange();
  const rect = range.getBoundingClientRect();
  range.surroundContents(commentSpanElement);
  sel.removeAllRanges();
  sel.addRange(range);
  return rect;
};

export default createTempComment;
