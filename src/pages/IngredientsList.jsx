import React, { useEffect, useRef, useState, useContext } from "react";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import axios from "axios";
import styled from "styled-components";
import ShowDataFromFirebase from "../helper/ShowDataFromFirebase";
import { database, auth } from "../firebase/FirebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { IngredientsDataContext } from "./IngredientsDataContext";

export default function IngredientsList() {
  const inputRef = useRef(null);
  const { dispatch } = useContext(IngredientsDataContext);
  const { state } = useContext(IngredientsDataContext);
  const [inputValue, setInputValue] = useState("");
  const [searchIngredientsArray, setSearchIngredientsArray] = useState([]);
  const [userIngredientsArray, setUserIngredientsArray] = useState([]);
  // const myApiKey = process.env.REACT_APP_API_KEY;

  const IngredientsList = {
    get: async (ingredients) => {
      const response = await axios.get(
        `https://api.spoonacular.com/food/ingredients/search?apiKey=&query=${inputValue}&number=10`
      );
      return response.data.results;
    },
  };

  const [user] = useAuthState(auth);

  ShowDataFromFirebase("Ingredients", setUserIngredientsArray);

  useEffect(() => {
    const fetchData = async () => {
      const itemListApi = await IngredientsList.get(inputValue);
      setSearchIngredientsArray(itemListApi);
    };
    fetchData();
  }, [inputValue]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInputValue(inputRef.current.value);
  };

  const onClickIngredients = async (data) => {
    const nameCollection = collection(database, "Ingredients");
    const newIngredient = {
      image: `${data.name}.jpg`,
      name: data.name,
      userId: user.uid,
    };

    const documentIngredients = await addDoc(nameCollection, newIngredient);
    console.log("doc added", documentIngredients);
    setSearchIngredientsArray([]);
    setUserIngredientsArray([
      ...userIngredientsArray,
      { ...newIngredient, dbId: documentIngredients.id },
    ]);
  };

  const deleteItem = async (item) => {
    console.log("item", item);
    console.log("check item", userIngredientsArray);
    try {
      await deleteDoc(doc(database, "Ingredients", item.dbId));
      const filteredArray = userIngredientsArray.filter(
        (itemList) => itemList.dbId !== item.dbId
      );
      setUserIngredientsArray(filteredArray);
    } catch (err) {
      console.log("err", err);
    }
  };

  const userIngredientsDataList = (array) => {
    if (user) {
      {
        return array.map((item) => {
          return (
            <div className="ingredients_list_container">
              <h2>{item.name}</h2>
              <button
                className="ingredients_list_button"
                onClick={() => deleteItem(item)}
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
        return array.map((data) => {
          return (
            <div value={data.name} onClick={() => onClickIngredients(data)}>
              {data.name}
            </div>
          );
        });
      }
    }
  };

  return (
    <StyleIngredientsContainer>
      <div>
        <h2>My Fridge</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" type="text" placeholder="Name" ref={inputRef} />
          <button>Search</button>
        </form>
        <div className="ingredientsList_container">
          {userFavoriteIngredientsList(searchIngredientsArray)}
        </div>
        <div className="ingredients_list">
          {userIngredientsDataList(userIngredientsArray)}
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
      position: relative:
    }

    .ingredients_list_container {
        display: flex;
    }
    .ingredients_list_button {
        margin-left: 3rem;
        width: 2rem;
    }
  `;
