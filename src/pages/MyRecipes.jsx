import React from "react";

export default function MyRecipes(props) {
  console.log("fridge", props.fridge);
  console.log("recipe", props.recipe);

  // ShowDataFromFirebase("fridge", props.setFridge);
  // ShowDataFromFirebase("recipe", props.setRecipe);

  return (
    <div>
    //   <button>My Recipes</button>
      <div>
    //<ul>
        {props.recipe.map((data, index) => {
            return (
            <div key={index}>
              <li>{data.name}
                    {data.image}
              </li>
              <button>X</button>
            </div>
          );
        })}
      </ul>     
      </div>
    </div>
  );
}
