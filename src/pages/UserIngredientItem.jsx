import React from "react";
import { useContext } from "react";
import { IngredientsDataContext } from "./IngredientsDataContext";

const UserIngredientItem = ({ index, item }) => {
  const { removeUserIngredient } = useContext(IngredientsDataContext);
  return (
    <div className="ingredients_list_container" key={index}>
      <h2>{item.name}</h2>
      <button
        className="ingredients_list_button"
        onClick={() => {
          removeUserIngredient(item);
        }}
      >
        X
      </button>
    </div>
  );
};

export default UserIngredientItem;
