import styled from 'styled-components';
import { Link } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { auth } from '../../firebase/FirebaseConfig';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import ShowDataFromFirebase from '../../helper/ShowDataFromFirebase';
import AddDataToFirebase from '../../helper/AddDataToFirebase';
import { IngredientsDataContext } from '../../context/IngredientsDataContext';

const ShoppingList = () => {
  const [user] = useAuthState(auth);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [userRecipesList, setUserRecipesList] = useState([]);
  const { userIngredientsList, setUserIngredientsList } = useContext(
    IngredientsDataContext
  );

  const addUserIngredient = async (data) => {
    const setData = {
      image: `https://spoonacular.com/cdn/ingredients_100x100/${data}.jpg`,
      name: data,
      userId: user.uid,
    };
    console.log('set data', setData);
    const newData = await AddDataToFirebase('fridge', setData);
    setUserIngredientsList([...userIngredientsList, newData]);
  };

  useEffect(() => {
    loadUserIngredients(user);
    loadUserRecipes(user);
  }, [user]);

  useEffect(() => {
    createArrayDifference(mergedIngredientsList);
  }, []);

  const loadUserIngredients = async (user) => {
    await ShowDataFromFirebase('fridge', setIngredientsList, user);
  };

  const loadUserRecipes = async (user) => {
    await ShowDataFromFirebase('recipe', setUserRecipesList, user);
  };

  const createIngredientsArrayFromRecipes = (first, second) => {
    for (let i = 0; i < second.length; i++) {
      let newLetters = second[i].ingredients;
      for (let p = 0; p < newLetters.length; p++) {
        first.push(newLetters[p]);
      }
    }
    return first;
  };

  const newIngredientsListFroRecipes = [];

  let mergedIngredientsList = createIngredientsArrayFromRecipes(
    newIngredientsListFroRecipes,
    userRecipesList
  );

  const createNewFridgeItems = (array) => {
    const newItemsArray = [];
    for (let i = 0; i < array.length; i++) {
      newItemsArray.push(array[i].name);
    }
    return newItemsArray;
  };

  const createArrayDifference = (array) => {
    let newResult = array.filter(
      (item) => createNewFridgeItems(ingredientsList).indexOf(item) == -1
    );
    return newResult;
  };

  const removeIngredients = (name) => {
    addUserIngredient(name);
    let newUserShoppingList = createArrayDifference(mergedIngredientsList);
    let newShoppingList = newUserShoppingList.indexOf(name);
    newUserShoppingList.splice(newShoppingList, 1);
    return newUserShoppingList;
  };

  const createshoppingList = (array) => {
    return array.map((data, index) => {
      return (
        <li key={index} value={data}>
          {data}
          <button
            className='styled-button'
            id='x-button'
            key={index}
            value={data}
            onClick={() => {
              removeIngredients(data);
            }}
          >
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
              {/* {newCreateshoppingList(testArray)} */}
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
