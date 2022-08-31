import React from 'react';
import ShowDataFromFirebase from '../helper/ShowDataFromFirebase';


const ShoppingList = (props) => {
  console.log("fridge",props.fridge);
  console.log("recipe", props.recipe);
  
  ShowDataFromFirebase('fridge', props.setFridge)
  ShowDataFromFirebase('recipe', props.setRecipe)
  
  // const fridgeList = {
  //   name: props.fridge.name,
  //   id: props.fridge.id,
  //   userId: props.fridge.userId,
  //   image: props.fridge.image,    
  // }
  // console.log(fridgeList);

  return (
    <div> 
      <div>ShoppingList</div>
      <div>{props.recipe.map((data) => {
        return <div> 
          <div>{data.name}</div>
          <button>X</button>
        </div> ;
      })}</div>
    </div>
  );
    

};

export default ShoppingList;
