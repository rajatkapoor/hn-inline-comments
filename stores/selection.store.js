import { useEffect, createContext, useContext, useReducer } from "react";

const SelectionContext = createContext();

const selectionReducer = (state, action) => {
  let finalState;
  switch (action.type) {
    case "UPDATE_SELECTION":
      finalState = {
        ...state,
        ...action.payload,
      };
      return finalState;
    default:
      finalState = state;
      return finalState;
  }
};

export const SelectionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(selectionReducer, { selection: null });

  return (
    <SelectionContext.Provider value={{ state, dispatch }}>
      {children}
    </SelectionContext.Provider>
  );
};

export const useSelection = () => {
  const context = useContext(SelectionContext);
  if (context === undefined) {
    throw new Error("useSelection must be used within a SelectionProvider");
  }

  const { state, dispatch } = context;
  const { selection } = state;
  const updateSelection = async (selection) => {
    dispatch({ type: "UPDATE_SELECTION", payload: { selection } });
  };
  const clearSelection = () => {
    dispatch({ type: "UPDATE_SELECTION", payload: { selection: null } });
  };
  const selectionChangeHandler = (e) => {
    const selection = document.getSelection();
    // console.log(
    //   "🚀 ~ file: selection.store.js ~ CHANGING selection",
    //   selection
    // );
    // if (!selection.isCollapsed) {
    updateSelection(selection);
    // }
  };
  useEffect(() => {
    console.log("setting up subs");
    // window.addEventListener("onselectionchange", selectionChangeHandler);
    document.addEventListener("selectionchange", selectionChangeHandler);
    return () => {
      console.log("cleaning up subs");

      document.removeEventListener("onselectionchange", selectionChangeHandler);
    };
  }, []);

  const getSelectionPosition = () => {
    try {
      if (selection && !selection.isCollapsed) {
        const range = selection.getRangeAt(0).cloneRange();
        const rect = range.getBoundingClientRect();
        return [rect.top - 50, rect.left];
      } else {
        return [-1000, -1000];
      }
    } catch (error) {
      return [-1000, -1000];
    }
  };

  return {
    selection,
    updateSelection,
    clearSelection,
    dispatch,
    getSelectionPosition,
  };
};
