import React from 'react';
import DeleteDataFromFirebase from '../helper/DeleteDataFromFirebase';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/FirebaseConfig';
import ShowDataFromFirebase from '../helper/ShowDataFromFirebase';

export default function MyFavoriteRecipes(props) {
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
    <div>
      <button>Favorite recipes</button>
      <div>
        {recipe.map((data, index) => {
          return (
            <div key={index}>
              <div className='favorite_recipes'>
                <div>{data.name}</div>
                <button
                  onClick={() => {
                    removeUserRecipe(data);
                  }}
                >
                  X
                </button>
              </div>
              <div className='favorite_recipes'>
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
