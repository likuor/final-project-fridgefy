import React from "react";
import styled from "styled-components";
import IngredientsList from "./IngredientsList";
import MyFavoriteRecipes from "./MyFavoriteRecipes";
import Navbar from "./Navbar";
import ShoppingList from "./ShoppingList";
import UserDataProvider from "./UserDataContext";

export default function ShoppingListPage() {
  return (
    <UserDataProvider>
      <Navbar />
      <StyleShoppingListPage>
        <div className="shopping_list_page_container">
          <IngredientsList />
          <MyFavoriteRecipes />
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
