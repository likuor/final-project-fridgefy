import styled from 'styled-components';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { auth } from '../firebase/FirebaseConfig';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import ShowDataFromFirebase from '../helper/ShowDataFromFirebase';

const ShoppingList = () => {
  const [user] = useAuthState(auth);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [recipesList, setRecipesList] = useState([]);

  const loadUserIngredients = async (user) => {
    await ShowDataFromFirebase('fridge', setIngredientsList, user);
  };

  const loadUserRecipes = async (user) => {
    await ShowDataFromFirebase('recipe', setRecipesList, user);
  };

  useEffect(() => {
    loadUserIngredients(user);
    loadUserRecipes(user);
  }, [user]);

  useEffect(() => {
    createArrayDifference(mergedIngredientsList);
  }, []);

  const newArrayResult = [];

  const createIngredientsArrayFromRecipes = (first, second) => {
    for (let i = 0; i < second.length; i++) {
      let newLetters = second[i].ingredients;
      for (let p = 0; p < newLetters.length; p++) {
        first.push(newLetters[p]);
      }
    }
    return first;
  };

  let mergedIngredientsList = createIngredientsArrayFromRecipes(
    newArrayResult,
    recipesList
  );

  const createNewFridgeItems = (array) => {
    const newItemsArray = [];
    for (let i = 0; i < array.length; i++) {
      newItemsArray.push(array[i].name);
    }
    return newItemsArray;
  };

  const newArray = createNewFridgeItems(ingredientsList);

  const createArrayDifference = (array) => {
    let newResult = array.filter((item) => newArray.indexOf(item) == -1);
    return newResult;
  };

  const createshoppingList = (array) => {
    return array.map((data, index) => {
      return (
        <li key={index}>
          {data}
          <button className='styled-button' id='x-button'>
            X
          </button>
        </li>
      );
    });
  };

  return (
    <StyleLeftBar>
      <div className='container'>
        <div className='sides_container' id='left-bar'>
          <div className='button-container'>
            <Link to={`/recipesPage`}>
              <button className='styled-button'>My Recipes</button>
            </Link>
            <Link to={`/shoppingListPage`}>
              <button className='styled-button'>Shopping List</button>
            </Link>
          </div>
          <div>
            <ul>
              {createshoppingList(createArrayDifference(mergedIngredientsList))}
            </ul>
          </div>
        </div>
      </div>
    </StyleLeftBar>
  );
};

const StyleLeftBar = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Yanone+Kaffeesatz&display=swap');

  .container {
    margin-top: 15px;
    font-family: 'Yanone Kaffeesatz', sans-serif;
    display: flex;
  }

  .sides_container {
    background-color: #7eebcc;
    width: 20vw;
    height: 50vw;
    border-radius: 10px;
    padding: 15px;
    color: whitesmoke;
    font-size: 20px;
  }

  .styled-button {
    border-radius: 5px;
    border: none;
    height: fit-content;
    width: fit-content;
    padding: 5px 15px;
    background-color: #63b8a0;
    color: whitesmoke;
  }

  .styled-button:hover {
    background-color: #559c88;
    cursor: pointer;
  }

  .button-container {
    display: flex;
    justify-content: space-around;
  }

  ul {
    position: relative;
    left: 50px;
    padding-top: 30px;
  }

  li {
    display: flex;
  }

  #x-button {
    padding: 2px;
    margin-left: 5px;
  }
`;

export default ShoppingList;
