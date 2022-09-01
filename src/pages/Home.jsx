import HomeSearch from './HomeSearch';
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HeroPage from "./HeroPage";
import RecipesPage from "./RecipesPage";
import ShoppingListPage from "./ShoppingListPage";

const Home = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={`/`} element={<HeroPage />} />
          <Route path={`/searc`} element={ <HomeSearch/>} />
          <Route path={`/recipesPage`} element={<RecipesPage />} />
          <Route path={`/shoppingListPage`} element={<ShoppingListPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Home;
