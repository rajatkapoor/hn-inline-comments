const createTempComment = () => {
  const commentSpan = document.createElement("span");

  commentSpan.dataset.commentId = "temp";
  commentSpan.style.backgroundColor = "pink";

  const sel = window.getSelection();
  const range = sel.getRangeAt(0).cloneRange();
  const rect = range.getBoundingClientRect();
  range.surroundContents(commentSpan);
  sel.removeAllRanges();
  sel.addRange(range);
  return rect;
};

export default createTempComment;
