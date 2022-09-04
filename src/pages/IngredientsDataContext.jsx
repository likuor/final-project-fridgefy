import React, { createContext, useState } from "react";
import { auth } from "../firebase/FirebaseConfig";
import DeleteDataFromFirebase from "../helper/DeleteDataFromFirebase";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import AddDataToFirebase from "../helper/AddDataToFirebase";
import ShowDataFromFirebase from "../helper/ShowDataFromFirebase";

export const IngredientsDataContext = createContext();

const IngredientsDataProvider = ({ children }) => {
  const [userIngredientsList, setUserIngredientsList] = useState([]);
  const [user] = useAuthState(auth);

  const loadUserIngredients = async (user) => {
    await ShowDataFromFirebase("fridge", setUserIngredientsList, user);
  };

  const addUserIngredient = async (data) => {
    const setData = {
      image: `https://spoonacular.com/cdn/ingredients_100x100/${data.name}.jpg`,
      name: data.name,
      userId: user.uid,
    };
    console.log("set data image", setData.image);
    const newData = await AddDataToFirebase("fridge", setData);
    setUserIngredientsList([...userIngredientsList, newData]);
  };

  const removeUserIngredient = async (data) => {
    await DeleteDataFromFirebase("fridge", data);
    const filteredArray = userIngredientsList.filter((itemList) => {
      return itemList.dbId !== data.dbId;
    });
    setUserIngredientsList(filteredArray);
  };

  useEffect(() => {
    loadUserIngredients(user);
  }, [user]);

  return (
    <IngredientsDataContext.Provider
      value={{
        userIngredientsList,
        setUserIngredientsList,
        loadUserIngredients,
        addUserIngredient,
        removeUserIngredient,
      }}
    >
      {children}
    </IngredientsDataContext.Provider>
  );
};

export default IngredientsDataProvider;
