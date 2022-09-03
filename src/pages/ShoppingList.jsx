import { Link } from "react-router-dom";
import React, { useState } from "react";
import { auth } from "../firebase/FirebaseConfig";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import ShowDataFromFirebase from "../helper/ShowDataFromFirebase";

const ShoppingList = () => {
  const [user] = useAuthState(auth);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [recipesList, setRecipesList] = useState([]);

  const loadUserIngredients = async (user) => {
    await ShowDataFromFirebase("fridge", setIngredientsList, user);
  };

  const loadUserRecipes = async (user) => {
    await ShowDataFromFirebase("recipe", setRecipesList, user);
  };

  useEffect(() => {
    loadUserIngredients(user);
    loadUserRecipes(user);
  }, [user]);

  useEffect(() => {
    createArrayDifference(mergedIngredientsList);
  }, []);

  const newArrayResult = [];

  const createIngredientsArrayFromRecipes = (first, second) => {
    for (let i = 0; i < second.length; i++) {
      let newLetters = second[i].ingredients;
      for (let p = 0; p < newLetters.length; p++) {
        first.push(newLetters[p]);
      }
    }
    return first;
  };

  let mergedIngredientsList = createIngredientsArrayFromRecipes(
    newArrayResult,
    recipesList
  );

  const createNewFridgeItems = (array) => {
    const newItemsArray = [];
    for (let i = 0; i < array.length; i++) {
      newItemsArray.push(array[i].name);
    }
    return newItemsArray;
  };

  const newArray = createNewFridgeItems(ingredientsList);

  const createArrayDifference = (array) => {
    let newResult = array.filter((item) => newArray.indexOf(item) == -1);
    return newResult;
  };

  const createshoppingList = (array) => {
    return array.map((data, index) => {
      return (
        <li key={index}>
          <img src="/images/delete.png" alt="test-" />
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
        <ul>
          {createshoppingList(createArrayDifference(mergedIngredientsList))}
        </ul>
      </div>
    </div>
  );
};

export default ShoppingList;
