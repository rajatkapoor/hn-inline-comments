import { createContext, useContext, useReducer } from "react";
import { updatePost as updatePostOnServer } from "../services/post.service";

const PostContext = createContext();

const postReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_POST":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const PostProvider = ({ children, id, post }) => {
  const [state, dispatch] = useReducer(postReducer, { id, post });

  return (
    <PostContext.Provider value={{ state, dispatch }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error("usePost must be used within a PostProvider");
  }

  const { state, dispatch } = context;
  const { post, id } = state;
  const updatePost = async (id, post) => {
    console.log(
      "🚀 ~ file: post.store.js ~ line 37 ~ updatePost ~ id, post",
      id,
      post
    );
    dispatch({ type: "UPDATE_POST", payload: { post, id } });
    await updatePostOnServer(id, post);
  };

  const updateContent = async (id, content) => {
    await updatePost(id, { ...post, content });
  };

  return {
    post,
    id,
    updatePost,
    updateContent,
    dispatch,
  };
};
