import React from 'react';
import { collection, doc, setDoc } from 'firebase/firestore';
import { database, auth } from '../firebase/FirebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';

const AddDataToFirebase = () => {
  const [user] = useAuthState(auth);

  const addData = (collectionName) => {
    const getCollection = doc(collection(database, collectionName));
    if (user && collectionName === 'fridge') {
      setDoc(getCollection, {
        id: 4,
        image: 'test4',
        name: 'test4',
        userId: user.uid,
      });
      console.log('Added ingredients');
    } else if (user && collectionName === 'recipe') {
      setDoc(getCollection, {
        id: 4,
        image: 'test4',
        information: 'test4',
        ingredients: ['sea weed', 'rice'],
        name: 'sushi',
        userId: user.uid,
      });
      console.log('Added recipe');
    } else {
      alert('Need to login to add a recipe');
    }
  };

  return (
    <>
      <button
        onClick={() => {
          addData('fridge');
        }}
      >
        Ingredients
      </button>
      <button
        onClick={() => {
          addData('recipe');
        }}
      >
        Recipe
      </button>
    </>
  );
};

export default AddDataToFirebase;
