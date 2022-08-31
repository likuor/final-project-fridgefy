import React, { useEffect, useRef, useState, useContext } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import axios from "axios";
import styled from "styled-components";
import ShowDataFromFirebase from "../helper/ShowDataFromFirebase";
import { UserDataContext } from "./UserDataContext";
import { database, auth } from "../firebase/FirebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

export default function IngredientsList() {
  const [list, setList] = useState([]);
  const [ingredients, setIngredients] = useState("");
  const [searchIngredientsArray, setSearchIngredientsArray] = useState([]);
  const inputRef = useRef();
  const [newArray, setNewArray] = useState([]);

  const { state } = useContext(UserDataContext);

  const IngredientsList = {
    get: async (ingredients) => {
      const response = await axios.get(
        `https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=e93d822dc64f4de7b1be57a1da836325&&query=${ingredients}`
        //   "https://api.spoonacular.com/recipes/complexSearch?query=pasta&maxFat=25&number=2"
      );
      return response;
    },
  };

  const [user] = useAuthState(auth);

  const Ingredients = {
    id: "",
    image: "",
    name: "",
    userId: "",
  };

  ShowDataFromFirebase("Ingredients", setNewArray);

  useEffect(() => {
    const fetchData = async () => {
      const itemListApi = await IngredientsList.get(ingredients);
      setSearchIngredientsArray(itemListApi.data);
    };
    fetchData();
  }, [ingredients]);

  // useEffect(() => {
  //   const itemData = collection(database, "Ingredients");
  //   getDocs(itemData).then((snapShot) => {
  //     setList(snapShot.docs.map((doc) => doc.data()));
  //   });
  //   onSnapshot(itemData, (item) => {
  //     setList(item.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   });
  // }, [listArray]);

  // useEffect(() => {
  //   const itemData = collection(database, "Ingredients");
  //   getDocs(itemData).then((snapShot) => {
  //     setList(snapShot.docs.map((doc) => doc.data()));
  //   });
  //   onSnapshot(itemData, (item) => {
  //     setList(item.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   });
  // }, []);

  // const reducer = (state, action) => {
  //   switch (action.type) {
  //     case "ADD_LIST":
  //       return [...state, { id: state.id, name: action.text }];
  //     case "REMOVE_ITEM":
  //       return list.filter((item) => item.name !== action.name);
  //     default:
  //       return state;
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = inputRef.current.value;
    setIngredients(name);
  };

  const onClickIngredients = async (data) => {
    Ingredients.name = inputRef.current;
    const nameCollection = collection(database, "Ingredients");
    const newIngredient = {
      id: "",
      image: `${data.name}.jpg`,
      name: data.name,
      userId: user.uid,
    };
    const documentIngredients = await addDoc(nameCollection, newIngredient);
    setSearchIngredientsArray([]);
    state.userIngredients = list;
    setNewArray([
      ...newArray,
      { ...newIngredient, id: documentIngredients.id },
    ]);
  };

  const userIngredientsDataList = (array) => {
    if (user) {
      {
        return array.map((item) => {
          return (
            <div className="ingredients_list_container">
              <h1>{item.name}</h1>
              <button
                className="ingredients_list_button"
                onClick={async () => {
                  await deleteDoc(doc(database, "Ingredients", item.id));
                  const filteredArray = newArray.filter(
                    (itemList) => itemList.id !== item.id
                  );
                  setNewArray(filteredArray);
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
          <input
            name="name"
            type="text"
            placeholder="Name"
            list="ingredientsList"
            ref={inputRef}
          />
          <button>Search</button>
          <button>Add</button>
        </form>
        <div id="ingredientsList" className="ingredientsList_container">
          {userFavoriteIngredientsList(searchIngredientsArray)}
        </div>
        <div className="ingredients_list">
          {userIngredientsDataList(newArray)}
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
