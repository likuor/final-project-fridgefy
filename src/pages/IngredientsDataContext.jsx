import React, { createContext, useReducer } from "react";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { database, auth } from "../firebase/FirebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

export const IngredientsDataContext = createContext();

const reducer = async (state, action) => {
  const [user] = useAuthState(auth);
  switch (action.type) {
    case "addIngredients":
      const ingredients = action.payload;
      console.log("check state", state.array);
      console.log("check action", action);
      console.log("check payload", ingredients);

    // const nameCollection = collection(database, "fridge");
    // const newIngredient = {
    //   image: `${ingredients.name}.jpg`,
    //   name: ingredients.name,
    //   userId: user.uid,
    // };

    // const documentIngredients = await addDoc(nameCollection, newIngredient);
    // console.log("doc added", documentIngredients);

    // return [
    //   ...state.array,
    //   { ...newIngredient, dbId: documentIngredients.id },
    // ];

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
    array: [],
  });

  return (
    <IngredientsDataContext.Provider value={{ state, dispatch }}>
      {children}
    </IngredientsDataContext.Provider>
  );
};

export default IngredientsDataProvider;
