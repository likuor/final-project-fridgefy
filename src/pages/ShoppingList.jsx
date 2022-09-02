import { Link } from "react-router-dom";
import React, { useState } from "react";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { database, auth } from "../firebase/FirebaseConfig";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const ShoppingList = () => {
  const [user] = useAuthState(auth);
  console.log("user", user);
  const newingredientsArray = [];
  const resultArray = [];
  const [ingredientsList, setIngredientsList] = useState([]);
  const [recipesList, setRecipesList] = useState([]);

  const arrayDifference = (array) => {
    const newResult = array.filter(
      (item) => newingredientsArray.indexOf(item) == -1
    );
    console.log("check array", array);
    console.log("check ingreArray", newingredientsArray);
    console.log("result array", newResult);
    return newResult;
  };

  console.log("check each files", ingredientsList, recipesList);

  ingredientsList.map((item) => {
    newingredientsArray.push(item.name);
    return newingredientsArray;
  });

  console.log("new ingredients array", newingredientsArray);

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
      setIngredientsList(data);
    } else {
      setIngredientsList([]);
    }
  };
  const loadUserRecipes = async (user) => {
    if (user) {
      const allDataInCollection = collection(database, "recipe");
      const filterdDataByUser = query(
        allDataInCollection,
        where("userId", "==", user.uid)
      );
      const snapshot = await getDocs(filterdDataByUser);
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        dbId: doc.id,
      }));
      setRecipesList(data);
    } else {
      setRecipesList([]);
    }
  };

  useEffect(() => {
    loadUserIngredients(user);
    loadUserRecipes(user);
  }, [user]);

  // const newResult = value.ingredients.filter(
  //   (item) => newingredientsArray.indexOf(item) == -1
  // );

  const createIngredientsArrayFromRecipes = () => {
    const newArrayResult = ["test"];
    for (let i = 0; i < recipesList.length; i++) {
      recipesList.forEach((value) => {
        newArrayResult.concat(value.ingredients);
        console.log("trial", newArrayResult);
      });
    }
    // recipesList.forEach((value) => {
    //   const trial = newArrayResult.concat(value.ingredients);
    //   console.log("trial", trial);
    // });
    console.log("last result", newArrayResult);
    return newArrayResult;
  };

  createIngredientsArrayFromRecipes();

  const userShoppingList = (array) => {
    // array shoppingList = []
    // foreach recipe -> ingredients and check if includes in shoppingList
    // if doesnt include, push it (li item )
    // if includes, skip
    // return shoppingList
    {
      return array.map((data, index) => {
        return (
          <li
            onClick={() => {
              createshoppingList(arrayDifference(data.ingredients));
            }}
            key={index}
          >
            <h2>{data.name}</h2>
            <h3>{data.ingredients + ","}</h3>
          </li>
        );
      });
    }
  };
  const createshoppingList = (array) => {
    return array.map((data, index) => {
      return (
        <li key={index}>
          <img src="/images/delete.png" alt="test" />
          {data}
        </li>
      );
    });
  };

  return (
    <div class="sides_container" id="left-bar">
      <div>
        <Link to={`/recipesPage/`}>Recipes page</Link>
        <Link to={`/shoppingListPage/`}>Shopping list page</Link>
      </div>
      <div>
        <ul>{userShoppingList(recipesList)}</ul>
        <ul>{createshoppingList}</ul>
      </div>
    </div>
  );
};

export default ShoppingList;
