import React from "react";
import AuthFirebase from "../firebase/AuthFirebase";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
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
};

export default Navbar;

const StyleNavbar = styled.div`
  .login_part {
    display: flex;
  }
`;
