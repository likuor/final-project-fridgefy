import React, { useState } from "react";
import Home from "./pages/Home";
import ShowDataFromFirebase from "./helper/ShowDataFromFirebase";

function App() {
  const [fridge, setFridge] = useState([]);
  const [recipe, setRecipe] = useState([]);

  ShowDataFromFirebase("fridge", setFridge);
  ShowDataFromFirebase("recipe", setRecipe);
  // console.log("fridge", fridge);
  // console.log("recipe", recipe);
  return (
    <div>
      <Home />
    </div>
  );
}

export default App;
