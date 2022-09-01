import React, { createContext, useReducer } from "react";

export const IngredientsDataContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "deleteIngredients":
      console.log("check state", state.array);
      console.log("check action", action);
      return;
    case "decrement":
      return { count: state.count - action.payload };
    case "reset":
      return { count: 0 };
    default:
      return state;
  }
};

const IngredientsDataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    name: "",
    image: "",
    userId: "",
    array: [],
  });

  return (
    <IngredientsDataContext.Provider value={{ state, dispatch }}>
      {children}
    </IngredientsDataContext.Provider>
  );
};

export default IngredientsDataProvider;
