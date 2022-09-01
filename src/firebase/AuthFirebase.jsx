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
          <div>Hello, {user.displayName} !</div>
          <div>
            <button onClick={() => auth.signOut()}>Logout</button>
          </div>
        </>
      ) : (
        <>
          <div>
            <button onClick={signInGoogle}>Login</button>
          </div>
        </>
      )}
    </>

  );
};

export default AuthFirebase;
