import { doc } from "firebase/firestore";
import { createContext, useContext, useReducer, useEffect } from "react";
import * as commentThreadService from "../services/commentThread.service";
import { commentsCollection } from "../utils/firebase";

const initialValues = {
  id: null,
  comments: [],
};

const tempThreadValues = {
  id: "temp",
  comments: [],
};

const CommentThreadContext = createContext();

const commentThreadReducer = (state, action) => {
  switch (action.type) {
    case "TEMP_COMMENT_THREAD":
      return { ...tempThreadValues };
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
  const tempCommentThread = () => {
    dispatch({
      type: "TEMP_COMMENT_THREAD",
    });
  };

  const addCommentToCommentThread = async (comment) => {
    dispatch({
      type: "UPDATE_COMMENT_THREAD",
      payload: { comments: [...comments, comment] },
    });
    await commentThreadService.addCommentToCommentThread(comment, id);
  };

  const initializeCommentThread = async (id) => {
    if (id === "temp") {
      return tempCommentThread();
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

  const updateCommentThread = async (id, comments) => {
    dispatch({
      type: "UPDATE_COMMENT_THREAD",
      payload: { comments, id },
    });
  };

  const createNewCommentThreadWithComment = async ({ id, text }) => {
    dispatch({
      type: "UPDATE_COMMENT_THREAD",
      payload: { comments: [{ id, text }], id: "new" },
    });
    const commentThreadId = await commentThreadService.createCommentThread({
      comments: [doc(commentsCollection, id)],
    });
    dispatch({
      type: "UPDATE_COMMENT_THREAD",
      payload: { id: commentThreadId },
    });
    return commentThreadId;
  };

  return {
    id,
    comments,
    initializeCommentThread,
    addCommentToCommentThread,
    resetCommentThread,
    isNewThread,
    isExistingThread,
    updateCommentThread,
    createNewCommentThreadWithComment,
  };
};
