import React from 'react';
import { collection, doc, setDoc } from 'firebase/firestore';
import { database, auth } from '../firebase/FirebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';

const AddDataToFirebase = () => {
  const [user] = useAuthState(auth);

  const addData = () => {
    if (user) {
      const getCollection = doc(collection(database, 'fridge'));
      setDoc(getCollection, {
        id: 3,
        image: 'test3',
        name: 'test3',
        userId: user.uid,
      });
      console.log('Added');
    } else {
      alert('Need to login to add ingredients');
    }
  };

  return <button onClick={addData}>AddDataToFirebase</button>;
};

export default AddDataToFirebase;
