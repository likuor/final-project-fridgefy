import React from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { database } from '../firebase/FirebaseConfig';

const AddDataToFirebase = async (collectionName, data) => {
  const nameCollection = collection(database, collectionName);
  const newDoc = await addDoc(nameCollection, data);
  const newData = { ...data, dbId: newDoc.id };

  return newData;
};

export default AddDataToFirebase;
