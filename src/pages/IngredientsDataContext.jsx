import React, { createContext, useState } from "react";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { database, auth } from "../firebase/FirebaseConfig";
import DeleteDataFromFirebase from "../helper/DeleteDataFromFirebase";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export const IngredientsDataContext = createContext();

const IngredientsDataProvider = ({ children }) => {
  const [userIngredientsList, setUserIngredientsList] = useState([]);
  const [user] = useAuthState(auth);

  const loadUserIngredients = async (user) => {
    if (user) {
      const allDataInCollection = collection(database, "fridge");
      const filterdDataByUser = query(
        allDataInCollection,
        where("userId", "==", user.uid)
      );
      const snapshot = await getDocs(filterdDataByUser);
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        dbId: doc.id,
      }));
      setUserIngredientsList(data);
    } else {
      setUserIngredientsList([]);
    }
  };

  const addUserIngredient = async (data) => {
    const nameCollection = collection(database, "fridge");
    const newIngredient = {
      image: `${data.name}.jpg`,
      name: data.name,
      userId: user.uid,
    };
    const documentIngredients = await addDoc(nameCollection, newIngredient);
    setUserIngredientsList([
      ...userIngredientsList,
      { ...newIngredient, dbId: documentIngredients.id },
    ]);
  };

  const removeUserIngredient = async (data) => {
    await DeleteDataFromFirebase("fridge", data);
    console.log("check data", data);
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
