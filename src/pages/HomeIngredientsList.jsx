import React, { useEffect, useRef, useState, useReducer } from "react";
import { database } from "../firebase/FirebaseConfig";
import {
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import axios from "axios";
import styled from "styled-components";

export default function HomeIngredientsList() {
  const [list, setList] = useState([]);
  const [ingredients, setIngredients] = useState("");
  const [listArray, setListArray] = useState([]);
  const inputRef = useRef();

  const IngredientsList = {
    get: async (ingredients) => {
      const response = await axios.get(
        `https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=e93d822dc64f4de7b1be57a1da836325&&query=${ingredients}`
        //   "https://api.spoonacular.com/recipes/complexSearch?query=pasta&maxFat=25&number=2"
      );
      return response;
    },
  };

  const Ingredients = {
    id: "",
    image: "",
    name: "",
    userId: "",
  };

  useEffect(() => {
    const fetchData = async () => {
      const itemListApi = await IngredientsList.get(ingredients);
      console.log("check", itemListApi.data);
      setListArray(itemListApi.data);
    };
    fetchData();
  }, [ingredients]);

  useEffect(() => {
    const itemData = collection(database, "Ingredients");
    getDocs(itemData).then((snapShot) => {
      setList(snapShot.docs.map((doc) => doc.data()));
    });
    onSnapshot(itemData, (item) => {
      setList(item.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, []);

  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD_LIST":
        return [...state, { id: state.id, name: action.text }];
      case "REMOVE_ITEM":
        return list.filter((item) => item.name !== action.name);
      default:
        return state;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = inputRef.current.value;
    setIngredients(name);
  };

  const onClickIngredients = async (data) => {
    Ingredients.name = inputRef.current;
    const nameCollection = collection(database, "Ingredients");
    const documentIngredients = await addDoc(nameCollection, {
      id: "",
      image: `${data.name}.jpg`,
      name: data.name,
      userId: "",
    });
    setListArray([]);
  };

  console.log("list", list);

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
          {listArray.map((data) => (
            <div value={data.name} onClick={() => onClickIngredients(data)}>
              {data.name}
            </div>
          ))}
        </div>
        <div className="ingredients_list">
          {list.map((item) => (
            <div className="ingredients_list_container">
              <h1>{item.name}</h1>
              <button
                className="ingredients_list_button"
                onClick={async () =>
                  await deleteDoc(doc(database, "Ingredients", item.id))
                }
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>
    </StyleIngredientsContainer>
  );
}
