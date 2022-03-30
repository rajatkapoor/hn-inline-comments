import { createContext, useContext, useEffect, useReducer } from "react";

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
    if (!selection || selection.isCollapsed || selection.rangeCount <= 0) {
      clearSelection();
    }
    const range = selection.getRangeAt(0);

    if (
      range &&
      range.startContainer.parentElement == range.endContainer.parentElement &&
      range.cloneContents().childElementCount === 0
    ) {
      updateSelection(selection);
    } else {
      updateSelection(null);
    }
  };

  useEffect(() => {
    // window.addEventListener("onselectionchange", selectionChangeHandler);
    document.addEventListener("selectionchange", selectionChangeHandler);
    return () => {
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
