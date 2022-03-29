import { createContext, useContext, useReducer, useEffect } from "react";
import * as commentThreadService from "../services/commentThread.service";

const initialValues = {
  id: null,
  comments: [],
};

const newThreadValues = {
  id: "temp",
  comments: [],
};

const CommentThreadContext = createContext();

const commentThreadReducer = (state, action) => {
  switch (action.type) {
    case "NEW_COMMENT_THREAD":
      return { ...newThreadValues };
    case "UPDATE_COMMENT_THREAD":
      return {
        ...state,
        ...action.payload,
      };
    case "RESET_COMMENT_THREAD":
      return initialValues;

    default:
      return state;
  }
};

export const CommentThreadProvider = ({ children }) => {
  const [state, dispatch] = useReducer(commentThreadReducer, initialValues);

  return (
    <CommentThreadContext.Provider value={{ state, dispatch }}>
      {children}
    </CommentThreadContext.Provider>
  );
};

export const useCommentThread = () => {
  const context = useContext(CommentThreadContext);
  if (context === undefined) {
    throw new Error(
      "useCommentThread must be used within a CommentThreadProvider"
    );
  }

  const { state, dispatch } = context;
  const { comments, id } = state;

  const isNewThread = () => !!id && id === "temp";
  const isExistingThread = () => !!id && !isNewThread();

  const resetCommentThread = () => {
    dispatch({
      type: "RESET_COMMENT_THREAD",
    });
  };
  const newCommentThread = () => {
    dispatch({
      type: "NEW_COMMENT_THREAD",
    });
  };

  const addCommentToCommentThread = async (comment) => {
    await commentThreadService.addCommentToCommentThread(id, comment);
    dispatch({
      type: "UPDATE_COMMENT_THREAD",
      payload: { comments: [...comments, comment] },
    });
  };

  const initializeCommentThread = async (id) => {
    if (id === "temp") {
      return newCommentThread();
    } else {
      dispatch({
        type: "UPDATE_COMMENT_THREAD",
        payload: { id, comments: [] },
      });
      const comments = await commentThreadService.getAllCommentsInCommentThread(
        id
      );
      dispatch({
        type: "UPDATE_COMMENT_THREAD",
        payload: { id, comments },
      });
    }
  };

  return {
    id,
    comments,
    initializeCommentThread,
    addCommentToCommentThread,
    resetCommentThread,
    isNewThread,
    isExistingThread,
  };
};
