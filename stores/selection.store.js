import { createContext, useContext, useReducer } from "react";

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

  return {
    selection,
    updateSelection,
    dispatch,
  };
};
