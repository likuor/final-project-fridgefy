import React from "react";

export default function MyFavoriteRecipes(props) {
  console.log("fridge", props.fridge);
  console.log("recipe", props.recipe);

  return (
    <div>
      <button>Favorite recipes</button>
      <div>
        {props.recipe.map((data, index) => {
            return (
            <div key={index}>
              <div className="favorite_recipes">
                <div>{data.name}</div>
                <button>X</button>
              </div>
              <div className="favorite_recipes">
              <div>{data.image}</div>
              <span>{data.information}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

