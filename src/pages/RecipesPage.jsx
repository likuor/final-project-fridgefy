import React from "react";
import styled from "styled-components";
import AllRecipes from "./AllRecipes";
import IngredientsList from "./IngredientsList";
import MyRecipes from "./MyRecipes";
import Navbar from "./Navbar";
import UserDataProvider from "./UserDataContext";
import ShowDataFromFirebase from "../helper/ShowDataFromFirebase";
import { useState } from "react";

export default function RecipesPage() {
  // const [fridge, setFridge] = useState([]);
  // const [recipe, setRecipe] = useState([]);

  

  // ShowDataFromFirebase('fridge', setFridge);
  // ShowDataFromFirebase('recipe', setRecipe);
  // console.log('fridge', fridge);
  // console.log('recipe', recipe);

  return (
    <UserDataProvider>
      <Navbar />
      <StyleRecipesPage>
        <div className="recipespage_container">
          <IngredientsList />
          <AllRecipes />
          <MyRecipes />
        </div>
      </StyleRecipesPage>
    </UserDataProvider>
  );
}

const StyleRecipesPage = styled.div`
  .recipespage_container {
    display: flex;
    justify-content: space-around;
  }
`;
