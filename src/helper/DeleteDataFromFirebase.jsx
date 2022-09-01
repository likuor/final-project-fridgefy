import React from 'react';
import { collection, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { database, auth } from '../firebase/FirebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';

const cityRef = doc(database, 'fridge', 'BJ');

const DeleteDataFromFirebase = () => {
  const [user] = useAuthState(auth);
  console.log(user);
};

return (
  <>
    <button
      onClick={() => {
        DeleteDataFromFirebase();
      }}
    >
      delete
    </button>
  </>
);

export default DeleteDataFromFirebase;
