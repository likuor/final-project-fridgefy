import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HeroPage from "./HeroPage";
import IngredientsDataProvider from "./IngredientsDataContext";
import Navbar from "./Navbar";
import RecipesDataProvider from "./RecipesDataContext";
import RecipesPage from "./RecipesPage";
import ShoppingListPage from "./ShoppingListPage";
import HomeSearch from './HomeSearch';

const Home = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={`/`} element={<HeroPage />} />
          <Route path={`/recipesPage`} element={<RecipesPage />} />
          <Route path={`/shoppingListPage`} element={<ShoppingListPage />} />
        </Routes>
      </BrowserRouter>
      <HomeSearch/>
    </div>
  );
};

export default Home;
