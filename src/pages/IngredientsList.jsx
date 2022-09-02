import React, { useEffect, useRef, useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import { IngredientsDataContext } from "./IngredientsDataContext";
import UserIngredientItem from "./UserIngredientItem";

export default function IngredientsList() {
  const inputRef = useRef(null);

  const { userIngredientsList, addUserIngredient } = useContext(
    IngredientsDataContext
  );
  const [inputValue, setInputValue] = useState("");
  const [searchIngredientsArray, setSearchIngredientsArray] = useState([]);

  const IngredientsList = {
    get: async (ingredients) => {
      const response = await axios.get(
        `https://api.spoonacular.com/food/ingredients/search?apiKey=${process.env.REACT_APP_API_KEY}&query=${inputValue}&number=10`
      );
      return response.data.results;
    },
  };

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
          {userIngredientsDataList(userIngredientsList)}
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
`;
