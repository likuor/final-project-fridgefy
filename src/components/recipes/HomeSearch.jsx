import React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

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
    <HomeSearchStyle>
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
    </HomeSearchStyle>
  );
}

const HomeSearchStyle = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Yanone+Kaffeesatz&display=swap');

.grid-container {
  display: grid;
  gap: 0px;
  grid-template-columns: 130px 130px 130px 130px;
  grid-template-rows: 130px 130px 130px 130px;
  margin-left: 15px;
  margin-bottom: 20px;
  gap: 10px;
  margin-top: 5%;
}

.grid-item {
  background-color: rgba(255, 255, 255, 0.8);
  font-size: 30px;
  text-align: center;
  height: 130px;
  width: 130px;
}

.recipe-image {
  width: 100%;
  height: 60%;
  overflow: hidden;
}

.recipe-image img {
  width: 100%;
  height: 100%;
}

.recipe-info {
  margin-top: 10px;
}
`


export default HomeSearch;
