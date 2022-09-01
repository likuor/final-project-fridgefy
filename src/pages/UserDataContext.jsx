import React, { createContext, useReducer } from "react";

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

const UserDataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    userId: "",
    userEmail: "",
    userName: "",
  });

  return (
    <UserDataContext.Provider value={{ state, dispatch }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataProvider;
