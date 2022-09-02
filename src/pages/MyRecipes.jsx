import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ShowDataFromFirebase from '../helper/ShowDataFromFirebase';
import DeleteDataFromFirebase from '../helper/DeleteDataFromFirebase';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/FirebaseConfig';

export default function MyRecipes() {
  const [user] = useAuthState(auth);
  const [recipe, setRecipe] = useState([]);

  const loadUserRecipe = async (user) => {
    await ShowDataFromFirebase('recipe', setRecipe, user);
  };

  const removeUserRecipe = async (data) => {
    await DeleteDataFromFirebase('recipe', data);
    const filteredArray = recipe.filter((itemList) => {
      return itemList.dbId !== data.dbId;
    });
    setRecipe(filteredArray);
  };

  useEffect(() => {
    loadUserRecipe(user);
  }, [user]);

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
              {recipe.map((data, index) => {
                return (
                  <div key={index}>
                    <li>{data.name}</li>
                    <button
                      onClick={() => {
                        removeUserRecipe(data);
                      }}
                    >
                      X
                    </button>
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
