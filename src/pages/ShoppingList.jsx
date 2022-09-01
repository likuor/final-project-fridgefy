import React, { useEffect } from "react";
import axios from "axios";

const ShoppingList = () => {
  const RecipesList = {
    get: async (ingredients) => {
      const response = await axios.get(
        // `https://api.spoonacular.com/food/ingredients/search?apiKey=dcaaa6665b2243a180865cbe5f7ac756&query=${inputValue}&number=10`
        `https://api.spoonacular.com/recipes/findByIngredients?apiKey=e93d822dc64f4de7b1be57a1da836325&number=5`
      );
      console.log("check recipes", response);
      return response.data.results;
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      const itemListApi = await RecipesList.get();
      // setSearchIngredientsArray(itemListApi);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div>Shopping items</div>
      <h2>Ingredients name</h2>
    </div>
  );
};

export default ShoppingList;
