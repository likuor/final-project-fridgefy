import React, { useEffect, useRef, useState, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { IngredientsDataContext } from '../../context/IngredientsDataContext';
import UserIngredientItem from './UserIngredientItem';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/FirebaseConfig';

export default function IngredientsList() {
  const inputRef = useRef(null);
  const [user] = useAuthState(auth);

  const { userIngredientsList, addUserIngredient } = useContext(
    IngredientsDataContext
  );
  const [inputValue, setInputValue] = useState('');
  const [searchIngredientsArray, setSearchIngredientsArray] = useState([]);

  const IngredientsList = {
    get: async (ingredients) => {
      const response = await axios.get(
        `https://api.spoonacular.com/food/ingredients/search?apiKey=${process.env.REACT_APP_API_KEY}&query=${inputValue}&number=5`
      );
      return response.data.results;
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      const itemListApi = await IngredientsList.get(inputValue);
      setSearchIngredientsArray(itemListApi);
    };
    fetchData();
  }, [inputValue]);

  const handleSubmit = async (e) => {
    if (user) {
      e.preventDefault();
      setInputValue(inputRef.current.value);
    } else {
      alert('Please log in or create new account');
    }
  };

  const userIngredientsDataList = (array) => {
    return array.map((item, index) => {
      return <UserIngredientItem item={item} key={index} />;
    });
  };

  const userFavoriteIngredientsList = (array) => {
    {
      return array.map((data, index) => {
        return (
          <div
            className='ingredientsList_option'
            onClick={() => {
              addUserIngredient(data);
              setSearchIngredientsArray([]);
            }}
            key={index}
          >
            {data.name}
          </div>
        );
      });
    }
  };

  return (
    <StyleIngredientsContainer>
      <div className='container'>
        <div className='sides_container'>
          <div>
            <h2>My Fridge</h2>
            <form onSubmit={handleSubmit}>
              <input
                name='name'
                type='text'
                placeholder='Ingredient'
                ref={inputRef}
              />
              <button className='styled-button'>Search</button>
            </form>
            <div className='ingredientsList_container'>
              {userFavoriteIngredientsList(searchIngredientsArray)}
            </div>
            <div className='ingredients_list'>
              {userIngredientsDataList(userIngredientsList)}
            </div>
          </div>
        </div>
      </div>
    </StyleIngredientsContainer>
  );
}

const StyleIngredientsContainer = styled.div`
  .ingredientsList_container {
    background-color: aqua;
    position: absolute;
    top: 6rem;
    left: 15rem;
    width: 10rem;
  }

  .ingredients_list {
    position: relative;
  }

  .ingredientsList_option {
    cursor: pointer;
  }

  .ingredients_list_h2 {
    margin: 0%;
    font-size: 1.5rem;
  }

  .ingredients_list_image {
    width: 50px;
    height: 50px;
    margin-left: 1rem;
  }

  .ingredients_list_container {
    display: flex;
    align-items: center;
  }
  .ingredients_list_button {
    margin-left: 1.5rem;
    width: 2rem;
  }

  .container {
    margin-top: 15px;
    font-family: 'Yanone Kaffeesatz', sans-serif;
    display: flex;
  }

  .sides_container {
    background-color: #7eebcc;
    width: 18vw;
    height: 100vw;
    border-radius: 10px;
    padding: 15px;
    color: whitesmoke;
    font-size: 25px;
  }

  h2 {
    margin: 10px;
  }

  .styled-button {
    border-radius: 5px;
    border: none;
    height: fit-content;
    width: fit-content;
    padding: 5px 5px;
    background-color: #63b8a0;
    color: whitesmoke;
    margin-left: 10px;
  }

  .styled-button:hover {
    background-color: #559c88;
    cursor: pointer;
  }
`;
