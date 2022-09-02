import React from 'react';
import styled from 'styled-components';
import HomeSearch from "./HomeSearch";

export default function AllRecipes() {
  return (
    <StyleAllRecipes>
      <div className='container'>
        <div className='middle-container'>
          <input type='text' placeholder='search recipe' />
          <div className='filter-recipe'>filter</div>
          <HomeSearch />
          <div className='grid-container'>
            <div className='grid-item'>
              <div className='recipe-image'>
                <img
                  src='https://www.comidaereceitas.com.br/wp-content/uploads/2007/11/Pastel_feiraaoo.jpg'
                  alt=''
                />
              </div>
              <p>name of the recipe</p>
              <div className='recipe-info'>
                <button className='styled-button'>more</button>
                <button className='styled-button'>add</button>
              </div>
            </div>

            <div className='grid-item'>
              <div className='recipe-image'>
                <img
                  src='https://assets.bonappetit.com/photos/60649584e6d8f20970dcf469/1:1/w_2560%2Cc_limit/Go-Live-Pad-See-Ew-new3.jpg'
                  alt=''
                />
              </div>
              <p>name of the recipe</p>
              <div className='recipe-info'>
                <button className='styled-button'>more</button>
                <button className='styled-button'>add</button>
              </div>
            </div>

            <div className='grid-item'>
              <div className='recipe-image'>
                <img
                  src='https://www.comidaereceitas.com.br/wp-content/uploads/2007/11/Pastel_feiraaoo.jpg'
                  alt=''
                />
              </div>
              <p>name of the recipe</p>
              <div className='recipe-info'>
                <button className='styled-button'>more</button>
                <button className='styled-button'>add</button>
              </div>
            </div>

            <div className='grid-item'>
              <div className='recipe-image'>
                <img
                  src='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/aperol-spritz-recipe-1628758400.jpg'
                  alt=''
                />
              </div>
              <p>name of the recipe</p>
              <div className='recipe-info'>
                <button className='styled-button'>more</button>
                <button className='styled-button'>add</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StyleAllRecipes>
  );
}

const StyleAllRecipes = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Yanone+Kaffeesatz&display=swap');

  .container {
    margin-top: 15px;
    font-family: 'Yanone Kaffeesatz', sans-serif;
    display: flex;
  }

  .middle-container {
    width: 60vw;
    background-color: #c8eee3;
    border-radius: 10px;
    margin: 0 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 15px;
    height: 50vw;
  }

  .filter-recipe {
    width: 80%;
    height: 10%;
    background-color: whitesmoke;
    border-radius: 10px;
    margin-top: 10px;
  }

  input {
    border: none;
    border-radius: 5px;
    height: 20px;
  }

  .styled-button {
    border-radius: 5px;
    border: none;
    height: fit-content;
    width: fit-content;
    padding: 2px 10px;
    background-color: #63b8a0;
    color: whitesmoke;
  }

  .styled-button:hover {
    background-color: #559c88;
    cursor: pointer;
  }

  .list {
    display: flex;
    justify-content: space-between;
  }
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
    width: fit-content;
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
    display: flex;
    justify-content: space-around;
  }

  p {
    font-family: 'Yanone Kaffeesatz', sans-serif;
    font-size: 12px;
    color: #63b8a0;
    font-weight: bold;
  }
`;
