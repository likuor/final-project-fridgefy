import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AuthFirebase from '../firebase/AuthFirebase';
import img from '../images/heroPageBackground.jpg';

export default function HeroPage() {
  return (
    <StyleHeroPage>
      <body className='hero-page'>
        <div className='login-container'>
          <div id='logo' className='font'>
            Fridgefy
          </div>
          <div className='username-container'>
            <AuthFirebase className='styled-button' id='hero-page-button' />
          </div>
          <div className='font'>or</div>
          <Link to={`/recipesPage`} className='guest'>
            continue as a guest
          </Link>
        </div>
      </body>
    </StyleHeroPage>
  );
}

const StyleHeroPage = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Yanone+Kaffeesatz&display=swap');
  .hero-page {
    height: 65vw;
    background: url(${img}) no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }

  .login-container {
    height: 45%;
    width: 50%;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 10px;
    position: relative;
    top: 100px;
    margin: 0 auto;
    box-shadow: 1px 1px 5px 5px #63b8a034;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .username-container {
    margin: 40px auto;
  }

  .username-container > input {
    border: #63b8a07a solid 1px;
  }

  #logo {
    font-size: 50px;
    height: fit-content;
    width: fit-content;
  }

  .font {
    color: #63b8a0;
    font-family: 'Pacifico', cursive;
    font-size: 30px;
  }

  .guest {
    text-decoration: underline;
    color: #559c88;
    font-family: 'Yanone Kaffeesatz', sans-serif;
    font-size: 20px;
  }

  #hero-page-button {
    height: 50px;
    width: 100px;
    font-size: 25px;
    font-family: 'Yanone Kaffeesatz', sans-serif;
    letter-spacing: 1px;
  }

  .guest:hover {
    cursor: pointer;
  }
`;
