import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function HeroPage() {
  return (
    <StyleHeroPage>
      <div className="login_part">
        <div className="login-container">
          <div id="logo" className="font">
            Fridgefy
          </div>
          <div className="username-container">
            <button className="styled-button" id="hero-page-button">
              Sign In
            </button>
          </div>
          <div className="font">or</div>
          <div className="guest">continue as guest</div>
          <div>
            <Link to={`/recipesPage/`}>Go to the page</Link>
          </div>
        </div>
      </div>
    </StyleHeroPage>
  );
}

const StyleHeroPage = styled.div`
  .login_part {
    display: flex;
    justify-content: center;
  }
`;
