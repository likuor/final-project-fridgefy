import React from 'react';
import { useState } from 'react';
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import ShoppingList from './pages/ShoppingList';
import ShowDataFromFirebase from './helper/ShowDataFromFirebase';
import AddDataToFirebase from './helper/AddDataToFirebase';

function App() {
  const [fridge, setFridge] = useState([]);
  const [recipe, setRecipe] = useState([]);

  ShowDataFromFirebase('fridge', setFridge);
  ShowDataFromFirebase('recipe', setRecipe);
  console.log('fridge', fridge);
  console.log('recipe', recipe);

  const fridgeList = {
    name: fridge.name,
    id: fridge.id,
    userId: fridge.userId,
    image: fridge.image,    
  }
  console.log("test",fridgeList);


  return (
    <div>
      <Navbar />
      <Home />
      <ShoppingList setFridge={setFridge} fridge={fridge} setRecipe={setRecipe} recipe={recipe}/>
      <AddDataToFirebase />
    </div>
  );
}

export default App;
