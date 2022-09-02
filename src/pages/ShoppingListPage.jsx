import React from "react";
import styled from "styled-components";
import IngredientsList from "./IngredientsList";
import MyFavoriteRecipes from "./MyFavoriteRecipes";
import ShoppingList from "./ShoppingList";
import UserDataProvider from "./UserDataContext";
import ShowDataFromFirebase from "../helper/ShowDataFromFirebase";
import { useState } from "react";
import Navbar from "./Navbar";

export default function ShoppingListPage() {
  const [fridge, setFridge] = useState([]);
  const [recipe, setRecipe] = useState([]);

  ShowDataFromFirebase("fridge", setFridge);
  ShowDataFromFirebase("recipe", setRecipe);

  return (
    <UserDataProvider>
      <Navbar />
      <StyleShoppingListPage>
        <div className="shopping_list_page_container">
          <IngredientsList />
          <MyFavoriteRecipes
            setFridge={setFridge}
            fridge={fridge}
            setRecipe={setRecipe}
            recipe={recipe}
          />
          <ShoppingList />
        </div>
      </StyleShoppingListPage>
    </UserDataProvider>
  );
}

const StyleShoppingListPage = styled.div`
  .shopping_list_page_container {
    display: flex;
    justify-content: space-around;
  }
`;
