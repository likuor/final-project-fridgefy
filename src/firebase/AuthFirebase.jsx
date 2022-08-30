import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from './FirebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';

const signInGoogle = () => {
  signInWithPopup(auth, provider);
};

const AuthFirebase = () => {
  const [user] = useAuthState(auth);

  return (
    <>
      {user ? (
        <>
          <li>{user.displayName}</li>
          <li>
            <button onClick={() => auth.signOut()}>Logout</button>
          </li>
        </>
      ) : (
        <>
          <li>
            <button onClick={signInGoogle}>Login</button>
          </li>
        </>
      )}
    </>

  );
};

export default AuthFirebase;
