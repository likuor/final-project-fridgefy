import React from 'react';
// import { signInWithPopup } from 'firebase/auth';
// import { auth, provider } from '../firebase/FirebaseConfig';

const loginGoogle = () => {
  console.log('herer');
  // signInWithPopup(auth, provider);
};

const Navbar = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <button onClick={loginGoogle}>Login</button>
          </li>
          <li>
            <button>Logout</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
