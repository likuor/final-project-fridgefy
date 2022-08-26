import React from 'react';
import AuthFirebase from '../firebase/AuthFirebase';

const Navbar = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>Home</li>
          <li>Shopping List</li>
          <AuthFirebase />
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
