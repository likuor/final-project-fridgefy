import React, { createContext, useReducer } from "react";

export const RecipesDataContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + action.payload };
    case "decrement":
      return { count: state.count - action.payload };
    case "reset":
      return { count: 0 };
    default:
      return state;
  }
};

const RecipesDataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    name: "",
    userId: "",
  });

  return (
    <RecipesDataContext.Provider value={{ state, dispatch }}>
      {children}
    </RecipesDataContext.Provider>
  );
};

export default RecipesDataProvider;
