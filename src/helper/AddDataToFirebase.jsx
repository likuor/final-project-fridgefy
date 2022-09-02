import React from 'react';
import { collection, doc, addDoc, setDoc } from 'firebase/firestore';
import { database, auth } from '../firebase/FirebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';

const AddDataToFirebase = (collectionName, userId, data) => {
  if (data && collectionName == 'fridge') {
    const nameCollection = collection(database, collectionName);
    let newIngredient = {
      image: `${data.name}.jpg`,
      name: data.name,
      userId: userId,
    };

    const documentIngredients = setDoc(nameCollection, newIngredient);
    newIngredient.dbId = documentIngredients;

    return newIngredient;
  }

  // addDoc(doc(database, collectionName, data.id));

  // const getCollection = doc(collection(database, collectionName));
  // const getCollection = collection(database, collectionName);
  // const newIngredient = {
  //   image: `${data.name}.jpg`,
  //   name: data.name,
  //   userId: userId,
  // };
  // const documentIngredients = addDoc(getCollection, newIngredient);
  // return documentIngredients;

  // if (userId && collectionName === 'fridge') {
  //   setDoc(getCollection, {
  //     id: 4,
  //     image: 'test4',
  //     name: 'test4',
  //     userId: userId,
  //   });
  //   console.log('Added ingredients');
  // } else if (userId && collectionName === 'recipe') {
  //   setDoc(getCollection, {
  //     id: 4,
  //     image: 'test4',
  //     information: 'test4',
  //     ingredients: ['sea weed', 'rice'],
  //     name: 'sushi',
  //     userId: userId,
  //   });
  //   console.log('Added recipe');
  // } else {
  //   alert('Need to login to add a recipe');
  // }
};

export default AddDataToFirebase;
