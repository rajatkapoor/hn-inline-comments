const createTempCommentThread = (selection) => {
  const commentSpan = document.createElement("span");

  commentSpan.dataset.commentThreadId = "temp";
  commentSpan.style.backgroundColor = "pink";

  const range = selection.getRangeAt(0).cloneRange();
  const rect = range.getBoundingClientRect();
  range.surroundContents(commentSpan);
  selection.removeAllRanges();
  selection.addRange(range);
  return rect;
};

export default createTempCommentThread;
