import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ShowDataFromFirebase from '../helper/ShowDataFromFirebase';
import DeleteDataFromFirebase from '../helper/DeleteDataFromFirebase';
import { useEffect, useState } from 'react';

export default function MyRecipes(props) {
  // console.log("fridge", props.fridge);
  // console.log("recipe", props.recipe);

  ShowDataFromFirebase("fridge", props.setFridge);
  ShowDataFromFirebase("recipe", props.setRecipe);


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
              {props.recipe.map((data, index) => {
                return (
                  <div key={index}>
                    <li>
                      {data.name}
                      {data.image}
                    </li>
                    <button 
                    onClick={() => {
                      DeleteDataFromFirebase('recipe', data); 
                    }}
                    >X</button>
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </StyleLeftBar>
  );
}

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
    font-size: 25px;
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
`;
