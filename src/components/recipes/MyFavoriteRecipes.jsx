import React from 'react';
import DeleteDataFromFirebase from '../../helper/DeleteDataFromFirebase';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/FirebaseConfig';
import ShowDataFromFirebase from '../../helper/ShowDataFromFirebase';
import styled from 'styled-components';

export default function MyFavoriteRecipes() {
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
    <StyleFavoriteRecipes>
      <div className='container'>
        <div className='middle-container'>
          <div className='font'>
            Favorite recipes
            <div>
              {recipe.map((data, index) => {
                return (
                  <div className='small-container' key={index}>
                    <div className='top-bar-recipe-name'>
                      <div>{data.name}</div>
                      <div className='button-container'>
                        <button className='styled-button'>See more</button>
                        <button
                          className='styled-button'
                          onClick={() => {
                            removeUserRecipe(data);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className='see-more-recipe'>
                      <div>{data.information}</div>
                      <div>{data.image}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </StyleFavoriteRecipes>
  );
}

const StyleFavoriteRecipes = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Yanone+Kaffeesatz&display=swap');

  .container {
    margin-top: 15px;
    font-family: 'Yanone Kaffeesatz', sans-serif;
    display: flex;
  }

  .middle-container {
    width: 60vw;
    background-color: #c8eee3;
    border-radius: 10px;
    margin: 0 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 15px;
    height: 50vw;
  }

  .styled-button {
    border-radius: 5px;
    border: none;
    height: fit-content;
    width: fit-content;
    padding: 2px 10px;
    background-color: #63b8a0;
    color: whitesmoke;
  }

  .styled-button:hover {
    background-color: #559c88;
    cursor: pointer;
  }

  .list {
    display: flex;
    justify-content: space-between;
  }

  .font {
    color: white;
    font-family: 'Pacifico', cursive;
    font-size: 60px;
    width: 80%;
    text-align: center;
  }

  .small-container {
    width: 80%;
    height: fit-content;
    background-color: white;
    border-radius: 7px;
    padding: 10px 10px;
    margin: 20px auto;
  }

  .top-bar-recipe-name {
    display: flex;
    justify-content: space-between;
    //border: 1px black solid;
    color: #63b8a0;
    font-family: 'Yanone Kaffeesatz', sans-serif;
    font-size: 15px;
  }

  .see-more-recipe {
    display: flex;
    justify-content: space-around;
    color: #63b8a0;
    font-family: 'Yanone Kaffeesatz', sans-serif;
    font-size: 15px;
  }

  .button-container {
    display: flex;
    justify-content: space-around;
    width: 160px;
  }
`;
