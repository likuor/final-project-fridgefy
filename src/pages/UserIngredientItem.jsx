import React from "react";
import { useContext } from "react";
import { IngredientsDataContext } from "./IngredientsDataContext";

const UserIngredientItem = ({ index, item }) => {
  const { removeUserIngredient } = useContext(IngredientsDataContext);
  return (
    <div className="ingredients_list_container" key={index}>
      <h2 className="ingredients_list_h2">{item.name}</h2>
      <img className="ingredients_list_image" src={item.image} alt="" />
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
