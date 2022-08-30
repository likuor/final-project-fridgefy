import React from 'react';
import AuthFirebase from '../firebase/AuthFirebase';
import styled from 'styled-components';

const Header = styled.header`
  @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
  > div {
    font-family: 'Pacifico', cursive;
  }
  background-color: #63b8a0;
  text-align: left;
  height: 65px;
  border-radius: 10px;
  display: flex;
  color: whitesmoke;
  font-size: 30px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const Navbar = () => {
  return (
    <div>
      <Header>
        <div>Fridgefy</div>
        <AuthFirebase />
      </Header>
    </div>
  );
};

export default Navbar;
