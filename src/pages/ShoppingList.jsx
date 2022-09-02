import React from 'react';
import { Link } from 'react-router-dom';

const ShoppingList = () => {
  const fakeArray1 = ['orange', 'apple', 'melon'];

  const fakeArray2 = ['orange', 'apple'];

  const arrayDifference = fakeArray1.filter(
    (item) => !fakeArray2.includes(item)
  );

  return (
    <div className='sides_container' id='left-bar'>
      <div>
        {/* <button>My Recipes</button>
        <button>Shopping List</button> */}
        <Link to={`/recipesPage/`}>Recipes page</Link>
        <Link to={`/shoppingListPage/`}>Shopping list page</Link>
      </div>
      <div>
        <ul>
          <li>
            Chocolate Cake
            <img src='/images/delete.png' alt='' />
          </li>
          <li>
            Fried Rice
            <img src='/images/delete.png' alt='' />
          </li>
          <li>
            Mozzarela Sticks
            <img src='/images/delete.png' alt='' />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ShoppingList;
