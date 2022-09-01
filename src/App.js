import React from 'react';
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import ShoppingList from './pages/ShoppingList';
import { useState } from 'react';
import ShowDataFromFirebase from './helper/ShowDataFromFirebase';
import AddDataToFirebase from './helper/AddDataToFirebase';
import MyRecipes from './pages/MyRecipes';

function App() {

  return (
    <div>
      <Home />
      <AddDataToFirebase />
    </div>
  );
}

export default App;
