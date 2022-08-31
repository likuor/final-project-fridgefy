import React, { useState } from 'react';
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import ShoppingList from './pages/ShoppingList';
import ShowDataFromFirebase from './helper/ShowDataFromFirebase';


function App() {
  const [fridge, setFridge] = useState([]);
  const [recipe, setRecipe] = useState([]);

  ShowDataFromFirebase('fridge', setFridge);
  ShowDataFromFirebase('recipe', setRecipe);
  console.log('fridge', fridge);
  console.log('recipe', recipe);
  return (
    <div>
      <Navbar />
      <Home />
      <ShoppingList />
    </div>
  );
}

export default App;
