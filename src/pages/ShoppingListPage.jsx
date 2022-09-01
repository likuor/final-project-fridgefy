import React from "react";
import styled from "styled-components";
import IngredientsList from "./IngredientsList";
import MyFavoriteRecipes from "./MyFavoriteRecipes";
import ShoppingList from "./ShoppingList";

export default function ShoppingListPage() {
  return (
    <StyleShoppingListPage>
      <div className="shopping_list_page_container">
        <IngredientsList />
        <MyFavoriteRecipes />
        <ShoppingList />
      </div>
    </StyleShoppingListPage>
  );
}

const StyleShoppingListPage = styled.div`
  .shopping_list_page_container {
    display: flex;
    justify-content: space-around;
  }
`;
