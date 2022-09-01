import React from "react";
import AuthFirebase from "../firebase/AuthFirebase";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Navbar() {
  return (
    <StyleNavbar>
      <nav>
        <Link to={`/`}>Home</Link>
        <Link to={`/recipesPage/`}>Recipes page</Link>
        <Link to={`/shoppingListPage/`}>Shopping list page</Link>
        <AuthFirebase />
      </nav>
    </StyleNavbar>
  );
}

// const Header = styled.header`
//   @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
//   > div {
//     font-family: 'Pacifico', cursive;
//   }
//   background-color: #63b8a0;
//   text-align: left;
//   height: 65px;
//   border-radius: 10px;
//   display: flex;
//   color: whitesmoke;
//   font-size: 30px;
//   flex-direction: row;
//   justify-content: space-around;
//   align-items: center;
// `;

const StyleNavbar = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Pacifico&display=swap");
  > .login_part {
    display: flex;
  }
`;
