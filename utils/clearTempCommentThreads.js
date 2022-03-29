const clearTempCommentThreads = () => {
  document
    .querySelectorAll("[data-comment-thread-id='temp']")
    .forEach((el) => el.replaceWith(el.textContent));
};

export default clearTempCommentThreads;
