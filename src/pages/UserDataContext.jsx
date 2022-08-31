import React, { createContext, useReducer, useState } from "react";
import Home from "./Home";

export const UserDataContext = createContext();

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

const HomeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    userName: "",
    userId: "",
    userEmail: "",
    userIngredients: [],
    userRecipes: [],
  });

  return (
    <UserDataContext.Provider value={{ state, dispatch }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default HomeProvider;
