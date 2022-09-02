import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ShoppingList = () => {
  const fakeArray1 = ['orange', 'apple', 'melon'];

  const fakeArray2 = ['orange', 'apple'];

  const arrayDifference = fakeArray1.filter(
    (item) => !fakeArray2.includes(item)
  );
  console.log('check array', arrayDifference);

  return (
    <StyleLeftBar>
      <div className='container'>
        <div className='sides_container' id='left-bar'>
        <div className="button-container">
          <Link to={`/recipesPage`}>
            <button className='styled-button'>My Recipes</button>
          </Link>
          <Link to={`/shoppingListPage`}>
            <button className='styled-button'>Shopping List</button>
          </Link>
        </div>
        <div>
          <ul>
            <li>
              Chocolate Cake
              <img src='/images/delete.png' alt='' />
              <button className="styled-button" id="x-button">X</button>
            </li>
            <li>
              Fried Rice
              <img src='/images/delete.png' alt='' />
              <button className="styled-button" id="x-button">X</button>
            </li>
            <li>
              Mozzarela Sticks
              <img src='/images/delete.png' alt='' />
              <button className="styled-button" id="x-button">X</button>
            </li>
          </ul>
        </div>
    </div>
  </div>
</StyleLeftBar>
  );
};
      
    

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
    font-size: 20px;
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

  ul {
    position: relative;
    left: 50px;
    padding-top: 30px;
  }

  li {
    display: flex:
  }

  #x-button {
    padding: 2px;
    margin-left: 5px;
  }
`;


export default ShoppingList;
