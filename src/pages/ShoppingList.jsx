import React, { useEffect } from "react";
import axios from "axios";

const ShoppingList = () => {
  // const RecipesList = {
  //   get: async (ingredients) => {
  //     const response = await axios.get(
  //       // `https://api.spoonacular.com/food/ingredients/search?apiKey=dcaaa6665b2243a180865cbe5f7ac756&query=${inputValue}&number=10`
  //       `https://api.spoonacular.com/recipes/findByIngredients?apiKey=e93d822dc64f4de7b1be57a1da836325&number=5`
  //     );
  //     console.log("check recipes", response);
  //     return response.data.results;
  //   },
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const itemListApi = await RecipesList.get();
  //     // setSearchIngredientsArray(itemListApi);
  //   };
  //   fetchData();
  // }, []);

  const fakeArray1 = ["orange", "apple", "melon"];

  const fakeArray2 = ["orange", "apple"];

  const arrayDifference = fakeArray1.filter(
    (item) => !fakeArray2.includes(item)
  );
  console.log("check array", arrayDifference);

  return (
    <div class="sides_container" id="left-bar">
      <div>
        <button>My Recipes</button>
        <button>Shopping List</button>
      </div>
      <div>
        <ul>
          <li>
            Chocolate Cake
            <img src="/images/delete.png" alt="" />
          </li>
          <li>
            Fried Rice
            <img src="/images/delete.png" alt="" />
          </li>
          <li>
            Mozzarela Sticks
            <img src="/images/delete.png" alt="" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ShoppingList;
