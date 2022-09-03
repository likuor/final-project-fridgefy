import React, { useEffect, useRef, useState, useContext } from 'react';
import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore';
import axios from 'axios';
import styled from 'styled-components';
import ShowDataFromFirebase from '../helper/ShowDataFromFirebase';
import { database, auth } from '../firebase/FirebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { IngredientsDataContext } from './IngredientsDataContext';
import DeleteDataFromFirebase from '../helper/DeleteDataFromFirebase';

export default function IngredientsList() {
  const inputRef = useRef(null);
  const { state } = useContext(IngredientsDataContext);
  const [inputValue, setInputValue] = useState('');
  const [searchIngredientsArray, setSearchIngredientsArray] = useState([]);
  const [userIngredientsArray, setUserIngredientsArray] = useState([]);
  const [user] = useAuthState(auth);
  const { dispatch } = useContext(IngredientsDataContext);

  const IngredientsList = {
    get: async (ingredients) => {
      const response = await axios.get(
        `https://api.spoonacular.com/food/ingredients/search?apiKey=${process.env.REACT_APP_API_KEY}&query=${inputValue}&number=10`
      );
      return response.data.results;
    },
  };

  ShowDataFromFirebase('fridge', setUserIngredientsArray);

  useEffect(() => {
    const fetchData = async () => {
      const itemListApi = await IngredientsList.get(inputValue);
      // const itemListApi = [
      //   { name: 'test1', image: 'image' },
      //   { name: 'test2', image: 'image' },
      // ];
      setSearchIngredientsArray(itemListApi);
    };
    fetchData();
  }, [inputValue]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInputValue(inputRef.current.value);
  };

  const onClickIngredients = async (data) => {
    const nameCollection = collection(database, 'fridge');
    const newIngredient = {
      image: `${data.name}.jpg`,
      name: data.name,
      userId: user.uid,
    };

    const documentIngredients = await addDoc(nameCollection, newIngredient);
    console.log('doc added', documentIngredients);
    setSearchIngredientsArray([]);
    setUserIngredientsArray([
      ...userIngredientsArray,
      { ...newIngredient, dbId: documentIngredients.id },
    ]);
  };
  console.log('here', userIngredientsArray);

  const userIngredientsDataList = (array) => {
    if (user) {
      {
        return array.map((item, index) => {
          return (
            <div className='ingredients_list_container' key={index}>
              <h2>{item.name}</h2>
              <button
                className='ingredients_list_button'
                // onClick={() => deleteItem(item)}
                onClick={() => {
                  DeleteDataFromFirebase('fridge', item);
                  const filteredArray = userIngredientsArray.filter(
                    (itemList) => itemList.dbId !== item.dbId
                  );
                  setUserIngredientsArray(filteredArray);
                }}
              >
                X
              </button>
            </div>
          );
        });
      }
    }
  };

  const userFavoriteIngredientsList = (array) => {
    if (user) {
      {
        return array.map((data, index) => {
          return (
            <div
              value={data.name}
              onClick={() => onClickIngredients(data)}
              // onClick={() => {
              //   setSearchIngredientsArray([]);
              //   setUserIngredientsArray([
              //     ...userIngredientsArray,
              //     {
              //       ...AddDataToFirebase('fridge', user.uid, data),
              //     },
              //   ]);
              // }}
              // onClick={() => onClickIngredients(data)}
              // onClick={() =>
              //   dispatch({ type: "addIngredients", payload: data.name })
              // }
              key={index}
            >
              {data.name}
            </div>
          );
        });
      }
    }
  };

  return (
    <StyleIngredientsContainer>
      <div class="container">
        <div class="sides_container">
          <div>
            <h2>My Fridge</h2>
            <form onSubmit={handleSubmit}>
              <input name='name' type='text' placeholder='Ingredient' ref={inputRef} />
              <button class="styled-button">Search</button>
            </form>
            <div className='ingredientsList_container'>
              {userFavoriteIngredientsList(searchIngredientsArray)}
            </div>
            <div className='ingredients_list'>
              {userIngredientsDataList(userIngredientsArray)}
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

  .ingredients_list_container {
    display: flex;
  }
  .ingredients_list_button {
    margin-left: 3rem;
    width: 2rem;
  }

  .container {
    margin-top: 15px;
    font-family: 'Yanone Kaffeesatz', sans-serif;
    display: flex;
}

.sides_container {
    background-color: #7EEBCC;
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
  background-color: #63B8A0;
  color: whitesmoke;
  margin-left: 10px;
}

.styled-button:hover{
  background-color: #559c88;
  cursor: pointer;
}
`;
