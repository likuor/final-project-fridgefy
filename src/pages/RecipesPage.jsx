import React from "react";
import styled from "styled-components";
import AllRecipes from "./AllRecipes";
import IngredientsList from "./IngredientsList";
import MyRecipes from "./MyRecipes";

export default function RecipesPage() {
  return (
    <StyleRecipesPage>
      <div className="recipespage_container">
        <IngredientsList />
        <AllRecipes />
        <MyRecipes />
      </div>
    </StyleRecipesPage>
  );
}

const StyleRecipesPage = styled.div`
  .recipespage_container {
    display: flex;
    justify-content: space-around;
  }
`;
