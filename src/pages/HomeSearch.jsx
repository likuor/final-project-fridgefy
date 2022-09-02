import React from 'react';
import { useEffect, useState } from 'react';

function HomeSearch() {
  const [HomeSearch, setHomeSearch] = useState([]);
  useEffect(() => {
    getHomeSearch();
  }, []);

  const getHomeSearch = async () => {
    const check = localStorage.getItem('homesearh');
    if (check) {
      setHomeSearch(JSON.parse(check));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&number=4`
      );
      const data = await api.json();

      localStorage.setItem('homesearch', JSON.stringify(data.results));
      setHomeSearch(data.results);
    }
  };

  return (
    <div className='grid-container'>
      {HomeSearch.map((recipe, index) => {
        return (
          <div className='grid-item' key={index}>
            <div className='recipe-image'>
              <img src={recipe.image} alt={recipe.title} />
            </div>
            <p>{recipe.title}</p>
            <div className='recipe-info'>
              <button className='styled-button'>more</button>
              <button className='styled-button'>add</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default HomeSearch;
