import React from 'react';
import styled from 'styled-components';
import AllRecipes from '../components/recipes/AllRecipes';
import IngredientsList from '../components/ingredients/IngredientsList';
import MyRecipes from '../components/recipes/MyRecipes';
import Navbar from '../components/Navbar';
import UserDataProvider from '../context/UserDataContext';

export default function RecipesPage() {
  return (
    <UserDataProvider>
      <Navbar />
      <StyleRecipesPage>
        <div className='recipespage_container'>
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
